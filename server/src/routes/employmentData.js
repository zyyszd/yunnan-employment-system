const express = require('express');
const db = require('../db/db');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('企业'), async (req, res) => {
  try {
    const {
      period,
      periodType,
      baseEmployment,
      currentEmployment,
      newEmployment,
      reduceEmployment,
      unemployment,
      unemploymentReasons,
      remarks
    } = req.body;

    const userId = req.user.id;

    if (!period || !periodType) {
      return res.status(400).json({ error: '调查期和周期类型不能为空' });
    }

    const companyResult = await db.query(
      'SELECT id FROM companies WHERE user_id = $1 AND status = $2',
      [userId, '已通过']
    );

    if (companyResult.rows.length === 0) {
      return res.status(400).json({ error: '请先完成企业备案并通过审核' });
    }

    const companyId = companyResult.rows[0].id;

    const result = await db.query(
      `INSERT INTO employment_data
       (user_id, company_id, period, period_type, base_employment, current_employment,
        new_employment, reduce_employment, unemployment, unemployment_reasons, remarks)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        userId, companyId, period, periodType,
        baseEmployment || 0, currentEmployment || 0, newEmployment || 0,
        reduceEmployment || 0, unemployment || 0, unemploymentReasons || [], remarks
      ]
    );

    res.status(201).json({
      message: '数据填报已提交，等待审核',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Employment data submit error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { period, status } = req.query;
    const userId = req.user.id;
    const userRole = req.user.role;

    let query = `
      SELECT ed.*, c.company_name, u.username
      FROM employment_data ed
      LEFT JOIN companies c ON ed.company_id = c.id
      LEFT JOIN users u ON ed.user_id = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (userRole === '企业') {
      query += ` AND ed.user_id = $${paramIndex}`;
      params.push(userId);
      paramIndex++;
    }

    if (period) {
      query += ` AND ed.period = $${paramIndex}`;
      params.push(period);
      paramIndex++;
    }

    if (status) {
      query += ` AND ed.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    query += ' ORDER BY ed.created_at DESC';

    const result = await db.query(query, params);

    res.json(result.rows);
  } catch (error) {
    console.error('Get employment data error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const dataId = req.params.id;

    const result = await db.query(
      `SELECT ed.*, c.company_name, u.username
       FROM employment_data ed
       LEFT JOIN companies c ON ed.company_id = c.id
       LEFT JOIN users u ON ed.user_id = u.id
       WHERE ed.id = $1`,
      [dataId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '数据不存在' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get employment data by id error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;

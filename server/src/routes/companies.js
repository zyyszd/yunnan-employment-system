const express = require('express');
const db = require('../db/db');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('企业'), async (req, res) => {
  try {
    const {
      companyName,
      unifiedCreditCode,
      legalPerson,
      contactPhone,
      address,
      regionCode,
      businessScope
    } = req.body;

    const userId = req.user.id;

    if (!companyName) {
      return res.status(400).json({ error: '企业名称不能为空' });
    }

    const existingCompany = await db.query(
      'SELECT id FROM companies WHERE user_id = $1',
      [userId]
    );

    let result;
    if (existingCompany.rows.length > 0) {
      result = await db.query(
        `UPDATE companies SET
          company_name = $1, unified_credit_code = $2, legal_person = $3,
          contact_phone = $4, address = $5, region_code = $6, business_scope = $7,
          status = '待审核', updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $8
         RETURNING *`,
        [companyName, unifiedCreditCode, legalPerson, contactPhone, address, regionCode, businessScope, userId]
      );
    } else {
      result = await db.query(
        `INSERT INTO companies (user_id, company_name, unified_credit_code, legal_person, contact_phone, address, region_code, business_scope)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [userId, companyName, unifiedCreditCode, legalPerson, contactPhone, address, regionCode, businessScope]
      );
    }

    res.status(200).json({
      message: '企业备案已提交，等待审核',
      company: result.rows[0]
    });
  } catch (error) {
    console.error('Company registration error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let result;
    if (userRole === '企业') {
      result = await db.query(
        'SELECT * FROM companies WHERE user_id = $1',
        [userId]
      );
    } else if (userRole === '市级' || userRole === '省级') {
      result = await db.query(
        'SELECT c.*, u.username FROM companies c LEFT JOIN users u ON c.user_id = u.id ORDER BY c.created_at DESC'
      );
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const companyId = req.params.id;

    const result = await db.query(
      'SELECT c.*, u.username FROM companies c LEFT JOIN users u ON c.user_id = u.id WHERE c.id = $1',
      [companyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '企业不存在' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;

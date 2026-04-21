const express = require('express');
const db = require('../db/db');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/company/:id', authMiddleware, roleMiddleware('市级', '省级'), async (req, res) => {
  try {
    const companyId = req.params.id;
    const { action, comment } = req.body;
    const userId = req.user.id;

    if (!['通过', '退回'].includes(action)) {
      return res.status(400).json({ error: '无效的操作' });
    }

    const status = action === '通过' ? '已通过' : '已退回';

    const result = await db.query(
      `UPDATE companies SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [status, companyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '企业不存在' });
    }

    const notificationContent = action === '通过'
      ? `您的企业备案已通过审核`
      : `您的企业备案已被退回，请修改后重新提交。原因是：${comment || '无'}`;

    await db.query(
      `INSERT INTO notifications (title, content, target_roles)
       VALUES ($1, $2, ARRAY['企业'])`,
      ['企业备案审核通知', notificationContent]
    );

    res.json({
      message: `企业备案已${action}`,
      company: result.rows[0]
    });
  } catch (error) {
    console.error('Company audit error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.post('/data/:id', authMiddleware, roleMiddleware('市级', '省级'), async (req, res) => {
  try {
    const dataId = req.params.id;
    const { action, comment } = req.body;

    if (!['通过', '退回'].includes(action)) {
      return res.status(400).json({ error: '无效的操作' });
    }

    const status = action === '通过' ? '已通过' : '已退回';

    const result = await db.query(
      `UPDATE employment_data
       SET status = $1, audit_comment = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [status, comment, dataId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '数据不存在' });
    }

    const data = result.rows[0];

    await db.query(
      `INSERT INTO notifications (title, content, target_roles)
       VALUES ($1, $2, ARRAY['企业'])`,
      [
        '数据审核通知',
        action === '通过'
          ? `您提交的${data.period}数据已通过审核`
          : `您提交的${data.period}数据已被退回，请修改后重新提交。原因是：${comment || '无'}`
      ]
    );

    res.json({
      message: `数据已${action}`,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Data audit error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.get('/pending', authMiddleware, roleMiddleware('市级', '省级'), async (req, res) => {
  try {
    const userRole = req.user.role;
    const userRegion = req.user.regionCode;

    let companyQuery = `
      SELECT c.*, u.username
      FROM companies c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.status = '待审核'
    `;

    let dataQuery = `
      SELECT ed.*, c.company_name, u.username
      FROM employment_data ed
      LEFT JOIN companies c ON ed.company_id = c.id
      LEFT JOIN users u ON ed.user_id = u.id
      WHERE ed.status = '待审核'
    `;

    if (userRole === '市级' && userRegion) {
      companyQuery += ` AND c.region_code LIKE '${userRegion}%'`;
      dataQuery += ` AND c.region_code LIKE '${userRegion}%'`;
    }

    const [companies, employmentData] = await Promise.all([
      db.query(companyQuery + ' ORDER BY c.created_at DESC'),
      db.query(dataQuery + ' ORDER BY ed.created_at DESC')
    ]);

    res.json({
      pendingCompanies: companies.rows,
      pendingData: employmentData.rows
    });
  } catch (error) {
    console.error('Get pending audits error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;

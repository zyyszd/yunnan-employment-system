const express = require('express');
const db = require('../db/db');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userRole = req.user.role;

    const result = await db.query(
      `SELECT * FROM notifications
       WHERE target_roles IS NULL OR $1 = ANY(target_roles)
       ORDER BY created_at DESC`,
      [userRole]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.put('/:id/read', authMiddleware, async (req, res) => {
  try {
    const notificationId = req.params.id;

    await db.query(
      'UPDATE notifications SET is_read = TRUE WHERE id = $1',
      [notificationId]
    );

    res.json({ message: '已标记为已读' });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.post('/', authMiddleware, roleMiddleware('市级', '省级'), async (req, res) => {
  try {
    const { title, content, targetRoles } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: '标题和内容不能为空' });
    }

    const result = await db.query(
      `INSERT INTO notifications (title, content, target_roles)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, content, targetRoles || ['企业', '市级', '省级']]
    );

    res.status(201).json({
      message: '通知已发布',
      notification: result.rows[0]
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;

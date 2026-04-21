const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: '用户名和密码不能为空' });
    }

    const result = await db.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        companyName: user.company_name,
        regionCode: user.region_code
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, role, companyName, regionCode } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: '用户名、密码和角色不能为空' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users (username, password, role, company_name, region_code)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, username, role, company_name, region_code`,
      [username, hashedPassword, role, companyName || null, regionCode || null]
    );

    res.status(201).json({
      message: '注册成功',
      user: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: '用户名已存在' });
    }
    console.error('Register error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.put('/password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const result = await db.query('SELECT password FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, result.rows[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: '原密码错误' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedPassword, userId]
    );

    res.json({ message: '密码修改成功' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      'SELECT id, username, role, company_name, region_code, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;

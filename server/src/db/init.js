const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const initDatabase = async () => {
  const adminPool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  });

  try {
    const dbName = process.env.DB_NAME || 'yunnan_employment';

    const result = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );

    if (result.rows.length === 0) {
      await adminPool.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully`);
    } else {
      console.log(`Database ${dbName} already exists`);
    }

    await adminPool.end();

    const appPool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: dbName,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
    });

    await appPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('企业', '市级', '省级')),
        company_name VARCHAR(200),
        region_code VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table users created/verified');

    await appPool.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        company_name VARCHAR(200) NOT NULL,
        unified_credit_code VARCHAR(50),
        legal_person VARCHAR(100),
        contact_phone VARCHAR(20),
        address VARCHAR(500),
        region_code VARCHAR(20),
        business_scope TEXT,
        status VARCHAR(20) DEFAULT '待审核' CHECK (status IN ('待审核', '已通过', '已退回')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table companies created/verified');

    await appPool.query(`
      CREATE TABLE IF NOT EXISTS employment_data (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        company_id INTEGER REFERENCES companies(id),
        period VARCHAR(20) NOT NULL,
        period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('月度', '上半月', '下半月')),
        base_employment INTEGER DEFAULT 0,
        current_employment INTEGER DEFAULT 0,
        new_employment INTEGER DEFAULT 0,
        reduce_employment INTEGER DEFAULT 0,
        unemployment INTEGER DEFAULT 0,
        unemployment_reasons TEXT[],
        remarks TEXT,
        status VARCHAR(20) DEFAULT '待审核' CHECK (status IN ('待审核', '已通过', '已退回')),
        audit_comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table employment_data created/verified');

    await appPool.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        target_roles TEXT[],
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table notifications created/verified');

    const hashedPassword = await bcrypt.hash('123456', 10);

    await appPool.query(`
      INSERT INTO users (username, password, role, company_name, region_code)
      VALUES ('enterprise1', $1, '企业', '云南某企业', '530000')
      ON CONFLICT (username) DO NOTHING
    `, [hashedPassword]);

    await appPool.query(`
      INSERT INTO users (username, password, role, region_code)
      VALUES ('city1', $1, '市级', '530000')
      ON CONFLICT (username) DO NOTHING
    `, [hashedPassword]);

    await appPool.query(`
      INSERT INTO users (username, password, role)
      VALUES ('province1', $1, '省级')
      ON CONFLICT (username) DO NOTHING
    `, [hashedPassword]);
    console.log('Default users created/verified');

    await appPool.query(`
      INSERT INTO notifications (title, content, target_roles)
      VALUES
        ('上报提醒', '2026年4月月度数据上报截止时间为4月30日，请及时完成上报。', ARRAY['企业']),
        ('系统通知', '系统将于2026年5月1日进行维护升级，届时系统将暂时无法访问。', ARRAY['企业', '市级', '省级'])
      ON CONFLICT DO NOTHING
    `);
    console.log('Default notifications created/verified');

    await appPool.end();
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

initDatabase();

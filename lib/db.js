import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Connection error:', err);
    } else {
        console.log('✅ Connected to native PostgreSQL:', res.rows[0]);
    }
});

export const query = (text, params) => pool.query(text, params);


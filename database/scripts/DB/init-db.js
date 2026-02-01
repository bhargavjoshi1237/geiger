const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Manually parse .env.local
try {
    const envPath = path.join(__dirname, '../.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
} catch (e) {
    console.warn('Could not read .env.local');
}

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
});

async function initDb() {
    try {
        const sqlPath = path.join(__dirname, '../database/init/setup.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        console.log('Running setup.sql...');
        await pool.query(sql);
        console.log('Database initialized successfully.');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await pool.end();
    }
}

initDb();

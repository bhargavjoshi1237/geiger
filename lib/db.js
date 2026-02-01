
import { Pool } from 'pg';

let pool;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  if (!global.dbPool) {
    global.dbPool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  pool = global.dbPool;
}

export const query = (text, params) => pool.query(text, params);

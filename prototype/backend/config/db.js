require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'sumanth1306',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sumanth1306_db',
  password: process.env.DB_PASSWORD || 'qwertyui',
  port: process.env.DB_PORT || 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const query = async (text, params) => {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: result.rowCount });
  return result;
};

module.exports = {
  query,
  pool,
};

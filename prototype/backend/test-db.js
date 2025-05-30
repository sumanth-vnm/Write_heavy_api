require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'sumanth1306',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sumanth1306_db',
  password: process.env.DB_PASSWORD || 'qwertyui',
  port: process.env.DB_PORT || 5432,
});

async function testConnection() {
  try {
    // Test the connection
    console.log('Testing database connection...');
    const client = await pool.connect();
    console.log('Connected to database successfully!');

    // Test a simple query
    console.log('Testing query execution...');
    const result = await client.query('SELECT NOW()');
    console.log('Query executed successfully! Current time:', result.rows[0].now);

    // Test creating a test table
    console.log('Testing table creation...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        test_data TEXT
      )
    `);
    console.log('Table created successfully!');

    // Test inserting data
    console.log('Testing data insertion...');
    await client.query('INSERT INTO test_table (test_data) VALUES ($1)', ['Test data']);
    console.log('Data inserted successfully!');

    // Test selecting data
    console.log('Testing data retrieval...');
    const selectResult = await client.query('SELECT * FROM test_table');
    console.log('Retrieved data:', selectResult.rows);

    console.log('All tests passed successfully!');
  } catch (error) {
    console.error('Database test failed!');
    console.error('Error details:', error);
  } finally {
    pool.end();
  }
}

testConnection();

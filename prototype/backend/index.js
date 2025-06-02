const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'sumanth1306',
  host: 'localhost',
  database: 'sumanth1306_db',
  password: 'qwertyui',
  port: 5432,
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection error:', err);
  } else {
    console.log('Connected to database successfully!');
  }
});

// Create users table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).then(() => {
  console.log('Users table created successfully!');
}).catch(err => {
  console.error('Error creating table:', err);
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Create users table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).catch(err => console.error('Error creating table:', err));

app.use((req, res, next) => {
    req.body = req.body || {};
    next();
  });



app.use(express.json());
  

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', async (req, res) => {
  try {
      const result = await pool.query('SELECT NOW()');
      res.json(result.rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error accessing database');
  }
});

app.post('/store-user', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error storing user:', err);
    res.status(500).json({ error: 'Failed to store user data' });
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Route to get a specific user
app.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Route to update a user
app.put('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const result = await pool.query(
      'UPDATE users SET name = $1 WHERE email = $2 RETURNING *',
      [name, email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Route to delete a user
app.delete('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const result = await pool.query('DELETE FROM users WHERE email = $1 RETURNING *', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.post('/', (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const result = num1 + num2;
  console.log(req.body);
  res.send(`The result is: ${result}`);
});

app.post('/sendEvent', (req, res) => {
    if(req.body == undefined){
      res.send("Wrong format");
      return;
    }
    if(req.body.meta == undefined) {
      res.send("Wrong Format");
      return;
    }
    if(req.body.data == undefined) {
      res.send("Wrong Format");
      return;
    }
    
    console.log(req);
    const x = req.body;
    res.send(x);  
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

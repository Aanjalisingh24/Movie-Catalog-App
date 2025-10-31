require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./Router');
const db = require('./db');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use('/', router);

async function testDBConnection() {
  try {
    const connection = await db.getConnection();
    console.log(' Connected to MySQL database');
    connection.release();
  } catch (err) {
    console.error('Failed to connect to MySQL database:', err);
  }
}

app.listen(3005, async () => {
  console.log('Server running on http://localhost:3005');
  await testDBConnection();
});



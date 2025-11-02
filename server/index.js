require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./Router');
const db = require('./db');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({
  origin: 'https://movie-catalog-frontend-pi.vercel.app', 
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

const PORT = process.env.MYSQLPORT || 3005;

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);
  await testDBConnection();
});


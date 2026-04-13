require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./Router');
const DBCONNECT = require('./db');
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

DBCONNECT();

const PORT = process.env.MYSQLPORT || 3005;

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);
});


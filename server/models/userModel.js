const db = require('../db');

const findUserByEmail = async (email) => {
  const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return results.length > 0 ? results[0] : null;
};

const createUser = async (email, hashedPassword) => {
  const [results] = await db.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword]
  );
  console.log('User inserted:', results);
  return results;
};

module.exports = { findUserByEmail, createUser };

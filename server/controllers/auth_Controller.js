require('dotenv').config();
const bcrypt = require('bcrypt');
const { findUserByEmail, createUser } = require('../models/userModel');
const {
  registrationModelValidation,
  loginModelValidation,
} = require('../models/validation');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

// handling the sign up request from frontent
const Signup = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase().trim();
  const { error } = registrationModelValidation(req.body);

  if (error) {
    return res.status(400).json({ success: false, error: error.details[0].message });
  }
  
  try {
    const user = await findUserByEmail(normalizedEmail);
    console.log('User found:', user);

    if (user) {
      console.log('Email already registered');
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(normalizedEmail, hashedPassword);

    const newUser = await findUserByEmail(normalizedEmail);

    return res.status(201).json({
      success: true,
      message: 'User created successfully. Please login now.',
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });

  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


// handling the login request from frontent
const Login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  const { error } = loginModelValidation(req.body);
  if (error) {
    return res.status(400).json({ success: false, error: error.details[0].message });
  }

  try {
    const user = await findUserByEmail( normalizedEmail);
    if (!user) {
      console.warn('User not found');
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn('Incorrect password');
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' } 
    );

   res.cookie('token', token, {
  httpOnly: true,
  secure: true,        
  sameSite: 'none',     
  maxAge: 3600000,     
});

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: { id: user.id, email: user.email },
    });

  } catch (err) {
    console.error(' Login error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


module.exports = { Signup, Login };

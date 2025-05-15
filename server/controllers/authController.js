// // import bcrypt from 'bcryptjs';
// // import jwt from 'jsonwebtoken';
// // import pool from '../config/db.js';

// // const generateToken = (userId) => {
// //   return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
// // };

// // export const register = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;
    
// //     console.log('Request body:', req.body);

// //     // Check if user exists
// //     const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);

// //     console.log('Existing user:', existingUser); 
    
// //     if (existingUser.length) {
// //       return res.status(400).json({ message: 'User already exists' });
// //     }

// //     // Hash password
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     // Create user
// //     const [result] = await pool.query(
// //       'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
// //       [name, email, hashedPassword]
// //     );

// //     const token = generateToken(result.insertId);

// //     res.cookie('token', token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       maxAge: 24 * 60 * 60 * 1000 // 24 hours
// //     });

// //     res.status(201).json({
// //       id: result.insertId,
// //       name,
// //       email
// //     });
// //   } catch (error) {
// //     console.error('Registration error:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // export const login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // Find user
// //     const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
// //     if (!users.length) {
// //       return res.status(400).json({ message: 'Invalid credentials' });
// //     }

// //     const user = users[0];

// //     // Verify password
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: 'Invalid credentials' });
// //     }

// //     const token = generateToken(user.id);

// //     res.cookie('token', token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === 'production',
// //       maxAge: 24 * 60 * 60 * 1000 // 24 hours
// //     });

// //     res.json({
// //       id: user.id,
// //       name: user.name,
// //       email: user.email
// //     });
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // export const logout = (req, res) => {
// //   res.clearCookie('token');
// //   res.json({ message: 'Logged out successfully' });
// // };

// // export const getMe = async (req, res) => {
// //   try {
// //     const [user] = await pool.query(
// //       'SELECT id, name, email FROM users WHERE id = ?',
// //       [req.user.userId]
// //     );

// //     if (!user.length) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     res.json(user[0]);
// //   } catch (error) {
// //     console.error('Get user error:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import pool from '../config/db.js';

// // Generate JWT Token
// const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
// };

// // Register User
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Validate input
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Check if user exists
//     const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
//     if (existingUser.length) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//     const [result] = await pool.query(
//       'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
//       [name, email, hashedPassword]
//     );

//     const token = generateToken(result.insertId);

//     // Set cookie
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 24 * 60 * 60 * 1000 // 24 hours
//     });

//     res.status(201).json({
//       id: result.insertId,
//       name,
//       email
//     });
//   } catch (error) {
//     console.error('Registration error:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Login User
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     // Find user
//     const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (!users.length) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const user = users[0];

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = generateToken(user.id);

//     // Set cookie
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 24 * 60 * 60 * 1000 // 24 hours
//     });

//     res.json({
//       id: user.id,
//       name: user.name,
//       email: user.email
//     });
//   } catch (error) {
//     console.error('Login error:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Logout User
// export const logout = (req, res) => {
//   res.clearCookie('token', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict'
//   });
//   res.json({ message: 'Logged out successfully' });
// };

// // Get Current User
// export const getMe = async (req, res) => {
//   try {
//     if (!req.user || !req.user.userId) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const [user] = await pool.query(
//       'SELECT id, name, email FROM users WHERE id = ?',
//       [req.user.userId]
//     );

//     if (!user.length) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user[0]);
//   } catch (error) {
//     console.error('Get user error:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);

    if (existingUser.length) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const token = generateToken(result.insertId);
    res.status(201).json({ token, user: { id: result.insertId, name, email } });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id);
    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out' });
};

export const getMe = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [req.user.userId]);
    const user = users[0];
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

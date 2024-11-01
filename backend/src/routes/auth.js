import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json({ status: 'ok', userId: user._id });
  } catch (error) {
    res.json({ status: 'error', error: 'Email already in use' });
  }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ status: 'error', error: 'Invalid login' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        return res.status(200).json({ status: 'ok', token });
      } else {
        return res.status(401).json({ status: 'error', error: 'Invalid login' });
      }
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  });
  
export default router;

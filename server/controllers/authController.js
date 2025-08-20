import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register (for user sign-up)
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const user = await User.create({ firstName, lastName, email, phone, password, role });
    res.status(201).json({ user, token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login (works for both user & admin)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ user, token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Verify any logged-in user
export const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Verify admin only
export const verifyAdmin = async (req, res, next) => {
  await verifyUser(req, res, async () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  });
};

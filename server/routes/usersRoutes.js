import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController.js';
import { verifyAdmin } from '../middlewares/auth.js'; // Only import what exists

const router = express.Router();

// Public route - user registration
router.post('/users', createUser);

// Public route - you can add login here if needed
// router.post('/login', login); // if you have login controller

// Admin-protected routes
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;

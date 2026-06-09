import express from 'express';
import { login, registerUser, logout, getUserInfo } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', registerUser);
router.get('/logout', protect, logout);
router.get('/user-info', protect, getUserInfo);

export default router;

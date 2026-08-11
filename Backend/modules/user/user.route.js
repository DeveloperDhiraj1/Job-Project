import express from 'express';
const router = express.Router();
import { registerUser, loginUser, verifyEmail } from './user.controller.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify-email/:token', verifyEmail);

export default router;
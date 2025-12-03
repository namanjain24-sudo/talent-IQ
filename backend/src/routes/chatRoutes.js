import express from 'express';
import { getChatToken, getVideoToken } from '../controllers/chatController.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Protected routes - require YOUR JWT authentication
router.get('/token', protectRoute, getChatToken);
router.get('/video/token', protectRoute, getVideoToken);

export default router;
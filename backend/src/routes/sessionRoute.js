import express from 'express';
import { 
  createSession, 
  getActiveSessions, 
  getMyRecentSessions, 
  getSessionById, 
  joinSession, 
  leaveSession,
  endSession 
} from '../controllers/sessionController.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Protected routes - require JWT authentication
router.post('/', protectRoute, createSession);
router.get('/active', protectRoute, getActiveSessions);
router.get('/my-recent', protectRoute, getMyRecentSessions);
router.get('/:id', protectRoute, getSessionById);
router.post('/:id/join', protectRoute, joinSession);
router.post('/:id/leave', protectRoute, leaveSession);
router.post('/:id/end', protectRoute, endSession);

export default router;
import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import roleGuard from '../middlewares/rbac';

const router = express.Router();

router.post('/submit-rating', authMiddleware, roleGuard('user'), submitRating);
router.post('/updateRating', authMiddleware, roleGuard('user'), updateRating);

export default router;

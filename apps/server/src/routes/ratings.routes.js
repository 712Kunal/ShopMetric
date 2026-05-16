import express from 'express';
import {
  submitRating,
  updateRating,
} from '../controllers/ratings.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import roleGuard from '../middlewares/rbac.js';

const router = express.Router();

router.post('/submit-rating', authMiddleware, roleGuard('user'), submitRating);
router.put(
  '/update-rating/:id',
  authMiddleware,
  roleGuard('user'),
  updateRating
);

export default router;

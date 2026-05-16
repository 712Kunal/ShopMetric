import express from 'express';
import { getDashboard } from '../controllers/owner.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import roleGuard from '../middlewares/rbac.js';

const router = express.Router();

router.get(
  '/getDashboard',
  authMiddleware,
  roleGuard('store_owner'),
  getDashboard
);

export default router;

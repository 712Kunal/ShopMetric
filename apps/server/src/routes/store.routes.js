import express from 'express';
import { listStores, getStoreById } from '../controllers/store.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import roleGuard from '../middlewares/rbac.js';

const router = express.Router();

router.get('/list-stores', authMiddleware, roleGuard('user'), listStores);
router.get('/get-store/:id', authMiddleware, roleGuard('user'), getStoreById);

export default router;

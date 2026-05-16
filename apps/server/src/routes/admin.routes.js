import express from 'express';
import {
  getDashboard,
  createUser,
  listUsers,
  getUserDetails,
  listStores,
  createStore,
} from '../controllers/admin.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import roleGuard from '../middlewares/rbac.js';

const router = express.Router();

router.get('/getDashboard', authMiddleware, roleGuard('admin'), getDashboard);
router.post('/create-user', authMiddleware, roleGuard('admin'), createUser);
router.get('/list-users', authMiddleware, roleGuard('admin'), listUsers);
router.get(
  '/get-user-details/:id',
  authMiddleware,
  roleGuard('admin'),
  getUserDetails
);
router.get(
  '/list-stores',
  authMiddleware,
  roleGuard('admin', 'user', 'store_owner'),
  listStores
);
router.post('/create-store', authMiddleware, roleGuard('admin'), createStore);

export default router;

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

const router = express.Router();

router.get('/getDashboard', authMiddleware, getDashboard);
router.post('/create-user', authMiddleware, createUser);
router.get('/list-users', authMiddleware, listUsers);
router.get('/get-user-details/:id', authMiddleware, getUserDetails);
router.get('/list-stores', authMiddleware, listStores);
router.post('/create-store', authMiddleware, createStore);

export default router;

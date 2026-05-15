import express from 'express';
import {
  register,
  login,
  refreshAccessToken,
  logout,
  updatePassword,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  registerSchema,
  loginSchema,
  passwordSchema,
} from '../validators/auth.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/refreshAccessToken', refreshAccessToken);
router.post(
  '/updatePassword',
  authMiddleware,
  validate(passwordSchema),
  updatePassword
);
router.post('/logout', authMiddleware, logout);

// example protected route
router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route', userId: req.userId });
});

export default router;

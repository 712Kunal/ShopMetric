import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import logger from './utils/logger.js';
import ApiResponse from './utils/ApiResponse.js';
import connectDB from './config/supabase.js';

import errorMiddleware from './middlewares/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import storeRoutes from './routes/store.routes.js';
import ownerRoutes from './routes/owner.routes.js';
import ratingsRoutes from './routes/ratings.routes.js';

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    const allowed = ['http://localhost:5173', 'http://localhost:5174'];

    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

connectDB();

app.get('/', async (req, res) => {
  res.json(new ApiResponse(200, 'Server is running successfully'));
});

app.use('/api/auth', authRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/stores', storeRoutes);

app.use('/api/storeOwner', ownerRoutes);

app.use('/api/ratings', ratingsRoutes);

app.use(errorMiddleware);

process.on('unhandledRejection', (reason, promise) => {
  logger.error(
    {
      promise,
      reason,
      type: 'unhandledRejection',
    },
    'Unhandled Promise Rejection occurred'
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

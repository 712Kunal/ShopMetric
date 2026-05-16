import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from './utils/logger.js';
import ApiResponse from './utils/ApiResponse.js';
import connectDB from './config/supabase.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Database connection
connectDB();

import errorMiddleware from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import storeRoutes from './routes/store.routes.js';

// Health-check
app.get('/', async (req, res) => {
  res.json(new ApiResponse(200, 'Server is running successfully'));
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('api/stores', storeRoutes);

app.use(errorMiddleware);

// Error handling for unhandled rejections
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

//Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

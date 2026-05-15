import { createClient } from '@supabase/supabase-js';
import logger from '../utils/logger.js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const connectDB = async () => {
  try {
    // Supabase doesn't need manual connection like Prisma
    logger.info('Supabase client initialized successfully');
  } catch (error) {
    logger.error(error, 'Supabase init failed');
    process.exit(1);
  }
};

export default connectDB;
export { supabase };
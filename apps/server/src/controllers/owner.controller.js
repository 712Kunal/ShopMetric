import { supabase } from '../config/supabase';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import logger from '../utils/logger';

export const getDashboard = async (req, res, next) => {
  try {
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('id,name')
      .eq('owner_id', req.user.id)
      .single();

    if (storeError || !store) {
      return next(new ApiError(404, 'No store found for this owner'));
    }

    // get all ratings with user who submitted them
    const { data: ratings, error: ratingsError } = await supabase
      .from('ratings')
      .select('id,value,created_at,user_id,users(name,email)')
      .eq('store_id', store.id);

    if (ratingsError) {
      return next(new ApiError(500, ratingsError.message));
    }

    const avgRatings = ratings?.length
      ? ratings.reduce((s, r) => s + r.value, 0)
      : null;

    const responseData = {
      store: {
        id: store.id,
        name: store.name,
        avg_ratings: avgRatings,
      },
      ratings: ratings.map((r) => ({
        id: r.id,
        value: r.value,
        created_at: r.created_at,
        user: r.users,
      })),
    };

    return res
      .status(201)
      .json(new ApiResponse(201, 'Fetched the dashboard', responseData));
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

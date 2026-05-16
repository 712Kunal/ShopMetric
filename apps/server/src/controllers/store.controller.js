import bcrypt from 'bcrypt';

import { supabase } from '../config/supabase.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import logger from '../utils/logger.js';

export const listStores = async (req, res, next) => {
  try {
    const { name, address, sortBy = 'name', order = 'asc' } = req.query;

    let query = supabase
      .from('stores')
      .select('id,name,address')
      .order(sortBy, { ascending: order === 'asc' });

    if (name) {
      query = query.ilike('name', `%${name}%`);
    }
    if (address) {
      query = query.ilike('address', `%${address}%`);
    }

    const { data: stores, error } = await query;

    if (error) {
      return next(new ApiError(500, error.message));
    }

    // each store- avg rating+current user's own rating
    const enriched = await Promise.all(
      stores.map(async (store) => {
        const { data: ratings } = await supabase
          .from('ratings')
          .select('value,user_id')
          .eq('store_id', store.id);

        const avgRating = ratings?.length
          ? (ratings.reduce((s, r) => s + r.value, 0) / ratings.length).toFixed(
              1
            )
          : null;

        const myRating =
          ratings?.find((r) => r.user_id === req.user.id) || null;

        return {
          ...store,
          avg_rating: avgRating,
          my_rating: myRating,
        };
      })
    );

    return res
      .status(201)
      .json(new ApiResponse(201, 'stores listed successfully', enriched));
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

export const getStoreById = async (req, res, next) => {
  try {
    const { data: store, error } = await supabase
      .from('stores')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !store) {
      return next(new ApiError(404, 'Store not found'));
    }

    const { data: ratings } = await supabase
      .from('ratings')
      .select('value,user_id')
      .eq('store_id', store.id);

    const avgRating = ratings?.length
      ? ratings.reduce((s, r) => s + r.value, 0)
      : null;

    const myRating = ratings?.find((r) => r.user_id === req.user.id) || null;

    const responseData = {
      ...store,
      avg_rating: avgRating,
      my_rating: myRating,
    };

    return res
      .status(201)
      .json(new ApiResponse(201, 'Store fetched successfully', responseData));
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

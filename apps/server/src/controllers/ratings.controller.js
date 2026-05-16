import { supabase } from '../config/supabase.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import logger from '../utils/logger.js';

export const submitRating = async (req, res, next) => {
  try {
    const { store_id, value } = req.body;
    if (value < 1 || value > 5) {
      return next(new ApiError(400, 'Rating must be between 1 to 5'));
    }

    //check already rated
    const { data: existing } = await supabase
      .from('ratings')
      .select('id')
      .eq('store_id', store_id)
      .eq('user_id', req.user.id)
      .single();

    if (existing) {
      return next(new ApiError(409, 'Already rated, use put to updated it'));
    }

    const { data, error } = await supabase
      .from('ratings')
      .insert({ user_id: req.user.id, store_id, value })
      .select()
      .single();

    if (error) {
      return next(new ApiError(500, error));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, 'Rated successfully', data));
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

export const updateRating = async (req, res, next) => {
  try {
    const { value } = req.body;
    if (value < 1 || value > 5) {
      return next(new ApiError(409, 'Rating must be between 1 to 5'));
    }

    // make sure this rating is belonging to the current user or not
    const { data: existing } = await supabase
      .from('ratings')
      .select('id,user_id')
      .eq('id', req.params.id)
      .single();

    if (!existing) {
      return next(new ApiError(404, 'Rating not found'));
    }

    if (existing.user_id != req.user.id) {
      return next(new ApiError(403, "Cannot modify another user's rating"));
    }

    const { data, error } = await supabase
      .from('ratings')
      .update({ value })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return next(new ApiError(500, error));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, 'Rating updated successfully', data));
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

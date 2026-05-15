import bcrypt from 'bcrypt';

import { supabase } from '../config/supabase.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import logger from '../utils/logger.js';

export const getDashboard = async (req, res, next) => {
  try {
    const [
      { count: usersCount },
      { count: storesCount },
      { count: ratingsCount },
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('stores').select('*', { count: 'exact', head: true }),
      supabase.from('ratings').select('*', { count: 'exact', head: true }),
    ]);

    const responseData = {
      users: usersCount,
      stores: storesCount,
      ratings: ratingsCount,
    };

    return res
      .status(201)
      .json(
        new ApiResponse(201, 'Dashboard fetched successfully', responseData)
      );
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, error.message));
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, address, password, role } = req.body;

    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return next(new ApiError(409, 'Email already exist'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error } = await supabase
      .from('users')
      .insert({ name, email, address, password: hashedPassword, role })
      .select('id, name, email, address, role')
      .single();

    if (error) {
      return next(new ApiError(500, error.message));
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, 'User created successfully', { user: newUser })
      );
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(401, 'Invalid or expired refresh token')
    );
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const {
      name,
      email,
      address,
      role,
      sortBy = 'name',
      order = 'asc',
    } = req.query;

    let query = supabase
      .from('users')
      .select('id, name, email, address, role')
      .order(sortBy, { ascending: order === 'asc' });

    if (name) query = query.ilike('name', `%${name}%`);
    if (email) query = query.ilike('email', `%${email}%`);
    if (address) query = query.ilike('address', `%${address}%`);
    if (role) query = query.eq('role', role);

    const { data, error } = await query;

    if (error) {
      return next(new ApiError(500, error.message));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, 'User lists successfully', data));
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(401, 'Invalid or expired refresh token')
    );
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id,name,email,role,address')
      .eq('id', req.params.id)
      .single();

    if (error || !user) {
      return next(new ApiError(404, 'User not found'));
    }

    if (user.role === 'store_owner') {
      const { data: store } = await supabase
        .from('stores')
        .select('id,name')
        .eq('owner_id', user.id)
        .single();

      if (store) {
        const { data: ratings } = await supabase
          .from('ratings')
          .select('value')
          .eq('store_id', store.id);

        const avg = ratings?.length
          ? (ratings.reduce((s, r) => s + r.value, 0) / ratings.length).toFixed(
              1
            )
          : null;

        user.store = { ...store, avg_rating: avg };
      }
    }

    return res
      .status(201)
      .json(new ApiResponse(201, 'User details fetched successfully', user));
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(401, 'Invalid or expired refresh token')
    );
  }
};

export const listStores = async (req, res, next) => {
  try {
    const { name, email, address, sortBy = 'name', order = 'asc' } = req.query;

    let query = supabase
      .from('stores')
      .select(`id, name, email, address, owner_id`)
      .order(sortBy, { ascending: order === 'asc' });

    if (name) query = query.ilike('name', `%${name}%`);
    if (email) query = query.ilike('email', `%${email}%`);
    if (address) query = query.ilike('address', `%${address}%`);

    const { data: stores, error } = await query;

    if (error) {
      return next(new ApiError(500, error.message));
    }

    //avg rating with each store
    const storesWithRating = await Promise.all(
      stores.map(async (store) => {
        const { data: ratings } = await supabase
          .from('ratings')
          .select('value')
          .eq('store_id', store.id);
        const avg = ratings?.length
          ? (ratings.reduce((s, r) => s + r.value, 0) / ratings.length).toFixed(
              1
            )
          : null;
        return { ...store, avg_rating: avg };
      })
    );

    return res
      .status(201)
      .json(new ApiResponse(201, 'Stores with avg ratings', storesWithRating));
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(401, 'Invalid or expired refresh token')
    );
  }
};

export const createStore = async (req, res, next) => {
  try {
    const { name, email, address, owner_id } = req.body;

    if (owner_id) {
      const { data: owner } = await supabase
        .from('users')
        .select('role')
        .eq('id', owner_id)
        .single();
      if (!owner || owner.role !== 'store_owner')
        return res
          .status(400)
          .json({ message: 'owner_id must be a store_owner user' });
    }

    const { data, error } = await supabase
      .from('stores')
      .insert({ name, email, address, owner_id })
      .select()
      .single();

    if (error) {
      return next(new ApiError(500, error.message));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, 'Store created successfully', data));
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(401, 'Invalid or expired refresh token')
    );
  }
};

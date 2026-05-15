import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { supabase } from '../config/supabase.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import logger from '../utils/logger.js';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/GenerateTokens.js';

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res, next) => {
  try {
    const { name, email, address, password } = req.validated.body;

    // Check existing user
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (fetchError) {
      return next(new ApiError(500, fetchError.message));
    }

    if (existingUser) {
      return next(
        new ApiError(409, 'User already exists', {
          field: 'email',
          value: email,
        })
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          address: address || null,
          password: hashedPassword,
          role: 'user',
        },
      ])
      .select('id, name, email, role')
      .single();

    if (insertError) {
      return next(new ApiError(500, insertError.message));
    }

    logger.info(
      { userId: newUser.id },
      'User registration successful'
    );

    return res.status(201).json(
      new ApiResponse(201, 'Registration successful', {
        user: newUser,
      })
    );

  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(500, error.message)
    );
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.validated.body;

    // Find user
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (findError || !user) {
      return next(
        new ApiError(401, 'Invalid credentials')
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return next(
        new ApiError(401, 'Invalid credentials')
      );
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      10
    );

    const { error: updateError } = await supabase
      .from('users')
      .update({
        refresh_token: hashedRefreshToken,
      })
      .eq('id', user.id);

    if (updateError) {
      return next(
        new ApiError(500, updateError.message)
      );
    }

    // Set cookie
    res.cookie(
      'refreshToken',
      refreshToken,
      REFRESH_COOKIE_OPTIONS
    );

    logger.info(
      { userId: user.id },
      'User logged in successfully'
    );

    return res.status(200).json(
      new ApiResponse(200, 'Login successful', {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
      })
    );

  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(500, error.message)
    );
  }
};

export const refreshAccessToken = async (
  req,
  res,
  next
) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return next(
        new ApiError(401, 'Refresh token missing')
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
      return next(
        new ApiError(401, 'Invalid refresh token')
      );
    }

    const isValid = await bcrypt.compare(
      token,
      user.refresh_token
    );

    if (!isValid) {
      return next(
        new ApiError(401, 'Invalid refresh token')
      );
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json(
      new ApiResponse(
        200,
        'Access token refreshed successfully',
        { accessToken }
      )
    );

  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(401, 'Invalid or expired refresh token')
    );
  }
};

export const updatePassword = async (
  req,
  res,
  next
) => {
  try {
    const { password } = req.validated.body;

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const { error } = await supabase
      .from('users')
      .update({
        password: hashedPassword,
      })
      .eq('id', req.user.id);

    if (error) {
      return next(
        new ApiError(400, error.message)
      );
    }

    logger.info(
      { userId: req.user.id },
      'Password updated successfully'
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        'Password updated successfully'
      )
    );

  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(500, error.message)
    );
  }
};

export const logout = async (
  req,
  res,
  next
) => {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        refresh_token: null,
      })
      .eq('id', req.user.id);

    if (error) {
      return next(
        new ApiError(500, error.message)
      );
    }

    // Clear cookie
    res.clearCookie(
      'refreshToken',
      REFRESH_COOKIE_OPTIONS
    );

    logger.info(
      { userId: req.user.id },
      'User logged out successfully'
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        'Logged out successfully'
      )
    );

  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(500, error.message)
    );
  }
};
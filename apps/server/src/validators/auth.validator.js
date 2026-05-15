import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(60, 'Name too long'),

    email: z.string().email('Invalid email format'),

    password: z.string().min(6, 'Password must be at least 6 characters long'),

    address: z.string().max(400, 'Address too long').optional(),

    role: z.enum(['admin', 'user', 'store_owner']).optional(),
  }),

  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),

    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),

  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

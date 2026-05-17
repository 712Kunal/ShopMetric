import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(60, 'Name too long'),

    email: z.string().email('Invalid email format'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
        'Password must contain at least one uppercase letter and one special character'
      ),

    address: z.string().max(400, 'Address too long').optional(),
  }),

  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
        'Password must contain at least one uppercase letter and one special character'
      ),
  }),

  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const passwordSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
        'Password must contain at least one uppercase letter and one special character'
      ),
  }),

  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

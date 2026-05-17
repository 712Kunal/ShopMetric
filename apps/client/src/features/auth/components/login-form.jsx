'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';
import { useLoginMutation } from '@/features/auth/state/redux-api/Authentication.api';
import { useDispatch } from 'react-redux';
import {
  setCredentials,
  setUpdateTokens,
} from '@/features/auth/state/slices/userSlice';

import { Eye, EyeOff } from 'lucide-react';

// Validation Schema
const LOGIN_SCHEMA = z.object({
  email: z.string().email('Please enter a valid email address'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must not exceed 16 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(
      /[!@#$%^&*]/,
      'Password must contain at least one special character'
    ),
});

export function LoginForm({ className, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(LOGIN_SCHEMA),

    defaultValues: {
      email: '',
      password: '',
    },

    mode: 'onChange',
  });

  const handleSubmit = async (data) => {
    setGeneralError(null);

    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const response = await loginUser(payload).unwrap();

      console.log('login success:', response);

      toast.success('User logged in Successfully 🎉', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'dark',
      });

      dispatch(
        setCredentials({
          user: response.data.user,
        })
      );
      dispatch(
        setUpdateTokens({
          accessToken: response.data?.accessToken,
        })
      );

      const role = response.data.user.role;

      if (role === 'admin') {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else if (role === 'store_owner') {
        navigate(ROUTES.OWNER_DASHBOARD);
      } else if (role === 'user') {
        navigate(ROUTES.USER_STORE_LIST);
      } else {
        navigate('/');
      }

      form.reset();
    } catch (error) {
      console.error('Login Error:', error);

      const backendMessage =
        error?.data?.message ||
        error?.data?.error?.message ||
        'Something went wroung';

      setGeneralError(backendMessage);

      toast.error('Login Failed 😕', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'dark',
      });
    }
  };

  return (
    <form
      id="login-form"
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>

          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>

          {generalError && (
            <div className="w-full bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-md text-sm">
              {generalError} 😟
            </div>
          )}
        </div>

        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                {...field}
                id="email"
                type="email"
                placeholder="m@example.com"
                aria-invalid={fieldState.invalid}
                className="bg-background"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>

              <div className="relative">
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  aria-invalid={fieldState.invalid}
                  className="pr-10 bg-background"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <FieldDescription>
                Password must be 8-16 characters and include at least one
                uppercase letter and one special character.
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Submit */}
        <Field>
          <Button type="submit" disabled={!form.formState.isValid}>
            Login
          </Button>
        </Field>

        {/* Footer */}
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{' '}
            <a href="/register" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

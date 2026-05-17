'use client';

import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

import { Eye, EyeOff, Lock } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useResetPasswordMutation } from '@/features/auth/state/redux-api/Authentication.api';

// import passwordResetImage from '@/assets/Images/password_reset.png';

import { Button } from '@/components/ui/button';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';

import { Separator } from '@/components/ui/separator';

// ==========================================
// Validation Schema
// ==========================================

const RESET_PASSWORD_SCHEMA = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
        'Password must contain at least one uppercase letter and one special character'
      ),

    confirmPassword: z.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ==========================================
// Component
// ==========================================

export default function UpdatePasswordPage() {
  const navigate = useNavigate();

  // ==========================================
  // Local States
  // ==========================================

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ==========================================
  // RTK Mutation
  // ==========================================

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // ==========================================
  // Form
  // ==========================================

  const form = useForm({
    resolver: zodResolver(RESET_PASSWORD_SCHEMA),

    defaultValues: {
      password: '',
      confirmPassword: '',
    },

    mode: 'onChange',
  });

  // ==========================================
  // Submit Handler
  // ==========================================

  const handleSubmit = async (data) => {
    try {
      const payload = {
        new_password: data.password,
      };

      const response = await resetPassword(payload).unwrap();

      console.log(response);

      toast.success('Password updated successfully');

      form.reset();

      navigate('/login');
    } catch (error) {
      console.error(error);

      toast.error(error?.data?.message || 'Failed to update password');
    }
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-6xl border rounded-2xl overflow-hidden shadow-lg bg-card">
        <div className="grid lg:grid-cols-2">
          {/* ========================================== */}
          {/* Left Side */}
          {/* ========================================== */}

          <div className="p-8 lg:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-6 w-6 text-primary" />

                <h1 className="text-2xl font-bold">Reset Password</h1>
              </div>

              <p className="text-muted-foreground">
                Create a strong password to secure your account.
              </p>
            </div>

            {/* ========================================== */}
            {/* Form */}
            {/* ========================================== */}

            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FieldGroup className="space-y-5">
                {/* ========================================== */}
                {/* Password */}
                {/* ========================================== */}

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password">New Password</FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your new password"
                          className="pr-10"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      {fieldState.error?.message && (
                        <FieldError errors={[fieldState.error.message]} />
                      )}

                      <div className="mt-2 text-xs text-muted-foreground space-y-1">
                        <p>Password must contain:</p>

                        <ul className="list-disc ml-5 space-y-1">
                          <li>At least 6 characters</li>
                          <li>One uppercase letter</li>
                          <li>One special character</li>
                        </ul>
                      </div>
                    </Field>
                  )}
                />

                {/* ========================================== */}
                {/* Confirm Password */}
                {/* ========================================== */}

                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          className="pr-10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      {fieldState.error?.message && (
                        <FieldError errors={[fieldState.error.message]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* ========================================== */}
              {/* Submit */}
              {/* ========================================== */}

              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid || isLoading}
              >
                {isLoading ? 'Updating Password...' : 'Reset Password'}
              </Button>
            </form>
          </div>

          {/* ========================================== */}
          {/* Divider */}
          {/* ========================================== */}

          <Separator orientation="vertical" className="hidden lg:block" />

          {/* ========================================== */}
          {/* Right Side */}
          {/* ========================================== */}

          <div className="hidden lg:flex items-center justify-center bg-muted/30 p-10">
            <img
              src=""
              alt="Reset Password"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

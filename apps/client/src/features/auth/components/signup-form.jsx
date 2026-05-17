'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Eye, EyeOff } from 'lucide-react';

// Validation Schema
const SIGNUP_SCHEMA = z.object({
  name: z
    .string()
    .min(20, 'Name must be at least 20 characters')
    .max(60, 'Name must not exceed 60 characters'),

  email: z.string().email('Please enter a valid email address'),

  address: z.string().max(400, 'Address must not exceed 400 characters'),

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

export function SignupForm({ className, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(SIGNUP_SCHEMA),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = async (data) => {
    console.log('Signup Form Data:', data);

    // Your API Logic Here
  };

  return (
    <form
      id="signup-form"
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>

          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Name + Email */}
        <div className="w-full flex gap-3">
          {/* Full Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>

                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  aria-invalid={fieldState.invalid}
                  className="bg-background"
                />

                <FieldDescription>
                  Name must be between 20 and 60 characters.
                </FieldDescription>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={fieldState.invalid}
                  className="bg-background"
                />

                <FieldDescription>
                  We'll use this to contact you.
                </FieldDescription>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Address */}
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="address">Address</FieldLabel>

              <Textarea
                {...field}
                id="address"
                placeholder="123 Main Street, City, State, ZIP"
                maxLength={400}
                rows={3}
                className="bg-background resize-none"
              />

              <FieldDescription>
                Address cannot exceed 400 characters.
              </FieldDescription>

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
              <FieldLabel htmlFor="password">Password</FieldLabel>

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

        {/* Submit Button */}
        <Field>
          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
          >
            Create Account
          </Button>
        </Field>

        {/* Footer */}
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/login">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

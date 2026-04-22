'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  // Initialize state to track user input for email and password fields. 
  // This allows for controlled components and easy form data retrieval upon submission.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the form submission event. 
  // Prevents default browser reload and prepares data for future authentication API calls.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    // TODO: Implement login logic
  };

  return (
    // Main container using Flexbox to center the login card both vertically and horizontally.
    // Includes background colors responsive to light/dark modes.
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      {/* Login Card: Provides a structured area for the form using the reusable Card component. */}
      <Card>
        {/* Header Section: Clearly identifies the page purpose to the user. */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Please enter your details to sign in
          </p>
        </div>

        {/* Form Section: Groups the input fields and the submission button. 
            Uses a vertical stack layout (space-y-6) for clean separation. */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Email Input Field: Using the reusable Input component to capture user identity. */}
            <Input
              label="Email address"
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            {/* Password Input Field: Using the reusable Input component to capture user credentials securely. */}
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button: Using the reusable Button component to trigger form submission. */}
          <Button type="submit">
            Sign in
          </Button>
        </form>

        {/* Navigation Footer: Provides a link to the registration page for new users. */}
        <div className="text-center text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Don't have an account? </span>
          <Link href="/register" className="font-semibold text-zinc-900 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300">
            Register now
          </Link>
        </div>
      </Card>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  // Initialize state variables to track inputs for new user creation. 
  // Includes essential fields like username and email, plus password confirmation for security.
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Handles registration form submission. 
  // Provides immediate feedback by checking if passwords match before proceeding with server communication.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side security check ensures the user confirmed their password correctly.
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log('Registration attempt with:', { username, email, password });
    // TODO: Implement registration logic
  };

  return (
    // Flexbox container centered for clear visibility on all screen sizes.
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      {/* Registration Card: Provides visual structure using the reusable Card component. */}
      <Card>
        {/* Title and Intro: Orients the user to the registration process. */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Join Chess GO and start playing today
          </p>
        </div>

        {/* Action Form: Captures required account details (Username, Email, Passwords). */}
        <form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
          aria-label="registration-form"
        >
          {/* Dynamic Error Messaging: Informs the user of validation failures.
              Added aria-live="polite" to ensure screen readers announce these changes. */}
          {error && (
            <div 
              aria-live="polite"
              className="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 py-2 rounded-md border border-red-200 dark:border-red-800"
            >
              {error}
            </div>
          )}

          <div className="space-y-4 rounded-md shadow-sm">
            {/* Username Input Field: Establishes a public identity for the player. */}
            <Input
              label="Username"
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="chessmaster"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Email Input Field: Using the reusable Input component for essential account management. */}
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

            {/* Password Creation: Secure field for account protection. */}
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Password Confirmation: Verification field to prevent typos in passwords. */}
            <Input
              label="Confirm Password"
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Action Trigger: Submits the registration form using the reusable Button component. */}
          <Button type="submit">
            Register
          </Button>
        </form>

        {/* Switch to Login Link: Allows existing users to navigate back to sign in. */}
        <div className="text-center text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Already have an account? </span>
          <Link href="/login" className="font-semibold text-zinc-900 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}


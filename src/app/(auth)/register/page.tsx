'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  // Initialize state variables to track inputs for new user creation. 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  
  // Use the custom auth hook to manage API and state.
  const { register, isLoading, error: authError } = useAuth();
  const router = useRouter();

  /**
   * Handles registration form submission. 
   * Validates passwords match locally before calling the hook's register method.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    // Pre-flight check: Client-side validation for password parity.
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    // Trigger the API call via our custom hook.
    const result = await register(username, email, password);
    
    // On success, guide the user to the main page.
    if (result.success) {
      router.push('/');
    }
  };

  // Combine local validation errors with server-side errors from the hook.
  const displayError = localError || authError;

  return (
    // Flexbox container centered for visibility.
    <div className="flex min-h-screen items-center justify-center bg-theme-bg-primary px-4">
      <Card>
        {/* Title and Intro */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-theme-text-primary">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-theme-text-muted">
            Join Chess GO and start playing today
          </p>
        </div>

        {/* Action Form: Grouped for accessibility. */}
        <form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
          aria-label="registration-form"
        >
          {/* Unified Error Messaging: Shows both local and server-side errors. */}
          {displayError && (
            <div 
              aria-live="polite"
              className="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 py-2 rounded-md border border-red-200 dark:border-red-800"
            >
              {displayError}
            </div>
          )}

          <div className="space-y-4 rounded-md shadow-sm">
            <Input
              label="Username"
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              disabled={isLoading}
              placeholder="chessmaster"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              label="Email address"
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              required
              disabled={isLoading}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              label="Confirm Password"
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              disabled={isLoading}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        {/* Switch to Login Link */}
        <div className="text-center text-sm">
          <span className="text-theme-text-muted">Already have an account? </span>
          <Link href="/login" className="font-semibold text-theme-accent-primary hover:brightness-110">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  // Initialize state to track user input for email and password fields. 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Use the custom auth hook to manage API interaction and loading/error states.
  const { login, isLoading, error } = useAuth();
  const router = useRouter();

  /**
   * Handle the form submission event. 
   * Triggers the login sequence and redirects the user to the dashboard upon success.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Attempt to log in with provided credentials.
    const result = await login(email, password);
    
    // Redirect if login was successful.
    if (result.success) {
      router.push('/');
    }
  };

  return (
    // Main container centered vertically and horizontally.
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <Card>
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Please enter your details to sign in
          </p>
        </div>

        {/* Auth Error Display: Responsive message for failed attempts. */}
        {error && (
          <div 
            aria-live="polite"
            className="mt-6 text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 py-2 rounded-md border border-red-200 dark:border-red-800"
          >
            {error}
          </div>
        )}

        {/* Form Section */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
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
              autoComplete="current-password"
              required
              disabled={isLoading}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        {/* Navigation Footer */}
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

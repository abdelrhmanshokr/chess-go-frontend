'use client';

import React from 'react';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/Button';
import { useHasHydrated } from '@/hooks/useHasHydrated';
import { useAuth } from '@/hooks/useAuth';

/**
 * Temporary component to verify Zustand store and useAuth hook functionality.
 * Displays current auth status and provides manual triggers for state changes.
 */
const StoreTestComponent = () => {
  // Access the user store and auth hook.
  const { isAuthenticated, user } = useUserStore();
  const { login, logout, isLoading, error: authError } = useAuth();
  
  // Use the custom hydration hook to ensure we don't access client-side only store data 
  // until the component has successfully hydrated in the browser.
  const hasHydrated = useHasHydrated();

  /**
   * Mock login function to test useAuth hook.
   * Note: This will attempt a real fetch to localhost.
   */
  const handleTestLogin = async () => {
    await login('test@example.com', 'password123');
  };

  // If the browser hasn't hydrated yet, we return null or a skeleton.
  if (!hasHydrated) {
    return (
      <div className="p-6 m-4 border-2 border-dashed border-zinc-200 rounded-lg dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 animate-pulse">
        <p className="text-sm text-zinc-400">Hydrating store...</p>
      </div>
    );
  }

  return (
    <div className="p-6 m-4 border-2 border-dashed border-zinc-300 rounded-lg dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
      <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-zinc-50">Auth Store & Hook Test</h3>
      
      {authError && (
        <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-sm border border-red-200 dark:border-red-800">
          Error: {authError}
        </div>
      )}

      {/* Display current state from the store. */}
      <p className="mb-2 text-zinc-700 dark:text-zinc-300">
        Status: <span className={`font-mono font-bold \${isAuthenticated ? 'text-green-600' : 'text-red-500'}`}>
          {isAuthenticated ? 'Authenticated' : 'Logged Out'}
        </span>
      </p>
      
      {isAuthenticated && user && (
        <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>User: {user.username} ({user.email})</p>
        </div>
      )}

      {/* Buttons to manually change store state for verification. */}
      <div className="flex gap-4 mt-4">
        {!isAuthenticated ? (
          <Button onClick={handleTestLogin} disabled={isLoading}>
            {isLoading ? 'Connecting...' : 'Test Login Hook'}
          </Button>
        ) : (
          <Button onClick={logout}>
            Trigger Logout Hook
          </Button>
        )}
      </div>
      
      <p className="mt-4 text-xs text-zinc-500 italic">
        * "Test Login Hook" attempts to fetch from API. It will fail if backend is offline.
      </p>
    </div>
  );
};

export default StoreTestComponent;

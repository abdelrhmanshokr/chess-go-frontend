'use client';

import React from 'react';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/Button';
import { useHasHydrated } from '@/hooks/useHasHydrated';

/**
 * Temporary component to verify Zustand store functionality.
 * Displays current auth status and provides manual triggers for state changes.
 */
const StoreTestComponent = () => {
  // Access the user store to manage global authentication state.
  const { isAuthenticated, user, setAuth, clearAuth } = useUserStore();
  
  // Use the custom hydration hook to ensure we don't access client-side only store data 
  // until the component has successfully hydrated in the browser.
  const hasHydrated = useHasHydrated();

  /**
   * Mock login function to test store updates.
   * Simulates receiving data from an API and updating the global state.
   */
  const handleMockLogin = () => {
    setAuth(
      { id: '123', username: 'testuser', email: 'test@example.com' },
      'mock-jwt-token'
    );
  };

  // If the browser hasn't hydrated yet, we return null or a skeleton.
  // This prevents hydration mismatch errors in Next.js when reading from localStorage.
  if (!hasHydrated) {
    return (
      <div className="p-6 m-4 border-2 border-dashed border-zinc-200 rounded-lg dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 animate-pulse">
        <p className="text-sm text-zinc-400">Hydrating store...</p>
      </div>
    );
  }

  return (
    <div className="p-6 m-4 border-2 border-dashed border-zinc-300 rounded-lg dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
      <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-zinc-50">Zustand Store Test</h3>
      
      {/* Display current state from the store. */}
      <p className="mb-2 text-zinc-700 dark:text-zinc-300">
        Status: <span className="font-mono font-bold">{isAuthenticated ? 'Authenticated' : 'Logged Out'}</span>
      </p>
      
      {isAuthenticated && user && (
        <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>User: {user.username} ({user.email})</p>
        </div>
      )}

      {/* Buttons to manually change store state for verification. */}
      <div className="flex gap-4 mt-4">
        {!isAuthenticated ? (
          <Button onClick={handleMockLogin}>
            Trigger Mock Login
          </Button>
        ) : (
          <Button onClick={clearAuth}>
            Trigger Logout
          </Button>
        )}
      </div>
      
      <p className="mt-4 text-xs text-zinc-500 italic">
        Tip: Login and refresh the page to verify persistence in localStorage.
      </p>
    </div>
  );
};

export default StoreTestComponent;

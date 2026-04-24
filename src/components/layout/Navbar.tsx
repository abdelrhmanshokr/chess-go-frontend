'use client';

import React from 'react';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { useAuth } from '@/hooks/useAuth';
import { useHasHydrated } from '@/hooks/useHasHydrated';
import { Button } from '@/components/ui/Button';

/**
 * Shared Navigation Bar component.
 * Displays dynamic links based on the user's authentication status.
 */
export const Navbar = () => {
  const { isAuthenticated, user } = useUserStore();
  const { logout } = useAuth();
  const hasHydrated = useHasHydrated();

  /**
   * Render navigation links based on auth status.
   * Logic is wrapped in a check for hydration to prevent server/client mismatches.
   */
  const renderNavLinks = () => {
    if (!hasHydrated) return null;

    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-4">
          <Link 
            href="/lobby" 
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
          >
            Lobby
          </Link>
          <Link 
            href="/profile" 
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
          >
            Profile
          </Link>
          <div className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-2" />
          <span className="text-xs text-zinc-500 hidden sm:inline">
            {user?.username}
          </span>
          <Button 
            onClick={logout} 
            variant="secondary" 
            size="sm"
          >
            Logout
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <Link 
          href="/login" 
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
        >
          Login
        </Link>
        <Link href="/register">
          <Button size="sm">Register</Button>
        </Link>
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Home Link */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          <span className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-2 py-0.5 rounded shadow-sm">
            GO
          </span>
          <span>Chess</span>
        </Link>

        {/* Dynamic Navigation Links */}
        <div className="flex items-center gap-6">
          {renderNavLinks()}
        </div>
      </div>
    </nav>
  );
};

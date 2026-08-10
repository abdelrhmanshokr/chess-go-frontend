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
  console.log("user from navbar", user);
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
            className="text-sm font-medium text-theme-text-muted hover:text-theme-text-primary transition-colors"
          >
            Lobby
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium text-theme-text-muted hover:text-theme-text-primary transition-colors"
          >
            Profile
          </Link>
          <div className="h-4 w-[1px] bg-theme-border mx-2" />
          <span className="text-xs text-theme-text-muted hidden sm:inline">
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
          className="text-sm font-medium text-theme-text-muted hover:text-theme-text-primary transition-colors"
        >
          Login
        </Link>
        <Link href="/register">
          <Button size="sm">Register</Button>
        </Link>
      </div>
    );
  };

  // S2-T6: bg-primary + theme border replace the previous white/zinc navbar shell.
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-theme-border bg-theme-bg-primary/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Home Link */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-theme-text-primary"
        >
          <span className="bg-theme-accent-primary text-theme-bg-primary px-2 py-0.5 rounded shadow-sm">
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

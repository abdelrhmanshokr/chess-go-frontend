'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useHasHydrated } from '@/hooks/useHasHydrated';
import { FindGameButton } from '@/components/lobby/FindGameButton';
import { Card } from '@/components/ui/Card';

/**
 * Lobby Page: The primary landing area for authenticated users.
 * Provides access to matchmaking and game mode selection.
 */
export default function LobbyPage() {
  const { user, isAuthenticated } = useUserStore();
  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);
  const hasHydrated = useHasHydrated();
  const router = useRouter();

  // Route Protection: If not authenticated, redirect to login.
  // We use useEffect to handle this after hydration to avoid SSR conflicts.
  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [hasHydrated, isAuthenticated, router]);

  // Show a blank state or loader while hydrating or redirecting.
  if (!hasHydrated || !isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-50" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-50 px-4 py-8 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Welcoming Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome back, <span className="text-zinc-600 dark:text-zinc-400">{user?.username}</span>!
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Choose a game mode and enter the queue to start playing.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Main Game Mode Selection */}
          <div className="md:col-span-2">
            <Card className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-900">
                {/* SVG Icon for Chess Board / Game Mode */}
                <svg
                  className="h-12 w-12 text-zinc-900 dark:text-zinc-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Standard 4-Player</h2>
              <p className="mb-8 mt-2 max-w-sm text-zinc-600 dark:text-zinc-400">
                The classic Chess GO experience. Four players, one board, ultimate strategy.
              </p>
              
              {/* Strategic Placement of the Find Game Button */}
              <FindGameButton />
            </Card>
          </div>

          {/* Secondary Stats / Info Cards (Placeholders for future features) */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Recent Activity</h3>
            <div className="mt-4 flex flex-col gap-3">
              <p className="text-sm text-zinc-500">No recent games played.</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Global Ranking</h3>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Your Rank</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">#---</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Elo Rating</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">1200</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

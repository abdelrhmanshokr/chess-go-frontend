'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useHasHydrated } from '@/hooks/useHasHydrated';
import { Card } from '@/components/ui/Card';

/**
 * Placeholder Game page: destination for the mocked matchmaking flow (S2-T4).
 * Will be replaced by the real ChessBoard view in Sprint 3 (S3-T1).
 */
export default function GamePage() {
  const { isAuthenticated } = useUserStore();
  const hasHydrated = useHasHydrated();
  const router = useRouter();

  // Route Protection: same guard pattern as /lobby — redirect unauthenticated
  // users after hydration to avoid SSR/client mismatches.
  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-theme-bg-primary">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-theme-border border-t-theme-accent-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-theme-bg-primary px-4">
      <Card className="text-center">
        <h1 className="text-2xl font-bold text-theme-text-primary">Match Found!</h1>
        <p className="mt-2 text-theme-text-muted">
          The game view is coming in Sprint 3 — this is a placeholder destination for the
          matchmaking flow.
        </p>
      </Card>
    </div>
  );
}

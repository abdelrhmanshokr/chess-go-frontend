'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/Button';

/** S2-T4: mock delay before a "match" is considered found. */
const MOCK_MATCH_FOUND_DELAY_MS = 4000;

/**
 * Overlay component that appears when a user is in the matchmaking queue.
 * Managed by the global uiStore. Informing the user that matchmaking is in progress.
 */
export const MatchmakingOverlay = () => {
  const { isQueueModalOpen, setQueueModal } = useUIStore();
  const router = useRouter();
  // Track the mock match-found timer locally so it can be cancelled on "Cancel"
  // without needing to expose transient UI state through the global store.
  const matchFoundTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Start (and clean up) the mock matchmaking timer whenever the queue modal opens.
   * On resolution, close the modal and route the user to the placeholder game view.
   */
  useEffect(() => {
    if (!isQueueModalOpen) return;

    matchFoundTimer.current = setTimeout(() => {
      setQueueModal(false);
      router.push('/game');
    }, MOCK_MATCH_FOUND_DELAY_MS);

    return () => {
      if (matchFoundTimer.current) clearTimeout(matchFoundTimer.current);
    };
  }, [isQueueModalOpen, router, setQueueModal]);

  /**
   * Cancel the mock timer and close the modal without navigating.
   */
  const handleCancel = () => {
    if (matchFoundTimer.current) clearTimeout(matchFoundTimer.current);
    setQueueModal(false);
  };

  if (!isQueueModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop: Semi-transparent to dim the lobby and prevent interaction */}
      <div
        className="absolute inset-0 bg-theme-bg-primary/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Overlay Content - S2-T7: theme tokens replace the previous zinc palette */}
      <div className="relative w-full max-w-md rounded-xl border border-theme-border bg-theme-surface p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-theme-bg-primary">
            {/* Animated Loading Spinner */}
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-theme-border border-t-theme-accent-primary" />
          </div>

          <h2 className="text-2xl font-bold text-theme-text-primary">Finding Match</h2>
          <p className="mt-2 text-theme-text-muted">
            Finding Teammate/Opponents...
          </p>

          <div className="mt-8 flex w-full flex-col gap-3">
            {/* Queue Timer / Status */}
            <div className="flex items-center justify-between rounded-lg bg-theme-bg-primary px-4 py-3">
              <span className="text-sm text-theme-text-muted font-medium">Wait time</span>
              <span className="font-mono text-sm font-bold text-theme-accent-primary animate-pulse">00:15</span>
            </div>
            
            <Button
              variant="secondary"
              className="mt-2"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

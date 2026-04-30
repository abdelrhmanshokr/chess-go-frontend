'use client';

import React from 'react';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/Button';

/**
 * Modal component that appears when a user is in the matchmaking queue.
 * Managed by the global uiStore.
 */
export const MatchmakingModal = () => {
  const { isQueueModalOpen, setQueueModal } = useUIStore();

  if (!isQueueModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
        // Allow clicking the backdrop to close the modal for better UX, but can be removed if undesired.
        onClick={() => setQueueModal(false)}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-50" />
          </div>
          
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Finding Match</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Scanning for available players in Standard 4-Player mode...
          </p>
          
          <div className="mt-8 flex w-full flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-3 dark:bg-zinc-950">
              <span className="text-sm text-zinc-500">Estimated stay time</span>
              <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-50">00:15</span>
            </div>
            
            <Button 
              variant="secondary" 
              className="mt-2"
              onClick={() => setQueueModal(false)}
            >
              Cancel Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

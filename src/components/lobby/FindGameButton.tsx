'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/uiStore';

/**
 * Component for entering the matchmaking queue.
 * Triggers the global matchmaking modal via uiStore.
 */
export const FindGameButton = () => {
  const setQueueModal = useUIStore((state) => state.setQueueModal);

  /**
   * Mock matchmaking trigger.
   * Updates uiStore to show the 'Finding Match' modal.
   */
  const handleFindGame = () => {
    setQueueModal(true);
    console.log('Matchmaking: Opening search modal...');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button 
        size="lg" 
        variant="primary" 
        onClick={handleFindGame}
        className="w-full sm:w-64 py-6 text-xl font-bold shadow-lg hover:shadow-xl transition-all"
      >
        Find Game
      </Button>
    </div>
  );
};

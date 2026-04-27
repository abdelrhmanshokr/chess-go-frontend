'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * Component for entering the matchmaking queue.
 * Includes a loading state to simulate the transition to a searching state.
 */
export const FindGameButton = () => {
  const [isSearching, setIsSearching] = useState(false);

  /**
   * Mock matchmaking trigger.
   * Real socket logic will be implemented in subsequent sprints.
   */
  const handleFindGame = () => {
    setIsSearching(true);
    console.log('Matchmaking: Searching for a Standard 4-Player game...');
    
    // For now, we'll just keep the searching state active to demonstrate UI feedback.
    // In a real scenario, this would initiate a websocket connection.
  };

  /**
   * Mock cancel search.
   */
  const handleCancelSearch = () => {
    setIsSearching(false);
    console.log('Matchmaking: Search cancelled.');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!isSearching ? (
        <Button 
          size="lg" 
          variant="primary" 
          onClick={handleFindGame}
          className="w-full sm:w-64 py-6 text-xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          Find Game
        </Button>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50 font-medium">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-ping" />
            Searching for players...
          </div>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={handleCancelSearch}
            className="w-full sm:w-64"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

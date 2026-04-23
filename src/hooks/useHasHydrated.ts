'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect when the client-side hydration is complete.
 * Essential for Next.js App Router applications that rely on client-only values
 * (like localStorage or Zustand persistent state) to prevent hydration mismatch errors.
 * 
 * @returns {boolean} - Returns true once the component has mounted on the client.
 */
export const useHasHydrated = () => {
  // Initialize state to false as the initial server-side render shouldn't be considered 'hydrated'.
  const [hasHydrated, setHasHydrated] = useState(false);

  // useEffect runs only on the client after the first render.
  // Setting hasHydrated to true here ensures that subsequent renders know we are now on the client.
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

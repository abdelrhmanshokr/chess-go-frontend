import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Interface representing the structure of a user object.
 * Centralizes user attributes used across the application for type safety.
 */
interface User {
  id: string;
  username: string;
  email: string;
}

/**
 * Interface for the user store state and actions.
 * Defines the contract for managing authentication data and methods.
 */
interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  // Action to update authentication state upon successful login or registration.
  setAuth: (user: User, token: string) => void;
  // Action to reset authentication state, effectively logging the user out.
  clearAuth: () => void;
}

/**
 * Zustand store for user authentication and session management.
 * Uses 'persist' middleware to automatically synchronize state with localStorage.
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial state: No user is authenticated by default.
      user: null,
      token: null,
      isAuthenticated: false,

      /**
       * Updates the store with user details and the session token.
       * Sets isAuthenticated to true to grant access to protected routes/features.
       */
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      /**
       * Clears all session data from the store and localStorage.
       * Resets the authentication status to false.
       */
      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      // Key name for the persistent storage in localStorage.
      name: 'chess-go-user-auth',
      // Explicitly using localStorage to ensure session survival across reloads.
      storage: createJSONStorage(() => localStorage),
    }
  )
);

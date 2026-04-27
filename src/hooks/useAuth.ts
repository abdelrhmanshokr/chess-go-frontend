'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { API_ENDPOINTS } from '@/lib/constants';
import { AuthResponse, AuthError } from '@/types/auth';

/**
 * Custom hook for handling authentication logic.
 * Manages login, registration, and logout operations including loading and error states.
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const setAuth = useUserStore((state) => state.setAuth);
  const clearAuth = useUserStore((state) => state.clearAuth);

  /**
   * Helper to handle API responses and errors.
   */
  const handleAuthResponse = async (response: Response): Promise<AuthResponse> => {
    const data = await response.json();
    console.log("Auth API response", data);

    if (!response.ok) {
      const authError = data as AuthError;
      throw new Error(authError.message || 'Authentication failed');
    }

    return data as AuthResponse;
  };

  /**
   * Logs in a user with identifier (email or username) and password.
   * Updates the userStore upon success.
   */
  const login = async (identifier: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const { user, token } = await handleAuthResponse(response);
      setAuth(user, token);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Registers a new user.
   * Updates the userStore upon success.
   */
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const { user, token } = await handleAuthResponse(response);
      setAuth(user, token);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logs out the current user by clearing the store.
   */
  const logout = () => {
    clearAuth();
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
};

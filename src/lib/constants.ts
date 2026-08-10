/**
 * API configuration and utility constants.
 * 
 * NOTE: For variables to be accessible in the browser (client-side),
 * they must be prefixed with NEXT_PUBLIC_.
 */

export const BACKEND_BASE_URL = 
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 
  process.env.BACKEND_BASE_URL || 
  'http://localhost:3000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BACKEND_BASE_URL}/auth/login`,
    REGISTER: `${BACKEND_BASE_URL}/auth/register`,
  }
};

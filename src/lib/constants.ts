/**
 * API configuration and utility constants.
 */

export const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BACKEND_BASE_URL}/auth/login`,
    REGISTER: `${BACKEND_BASE_URL}/auth/register`,
  }
};

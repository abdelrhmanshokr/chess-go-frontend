/**
 * Authentication related types and interfaces.
 */

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}

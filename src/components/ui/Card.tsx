import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Card component to provide consistent visual grouping and elevation.
 * Used for wrapping forms, profile sections, and other discrete UI units.
 */
export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${className}`}>
      {children}
    </div>
  );
};

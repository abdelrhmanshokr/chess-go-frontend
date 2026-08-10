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
  // S2-T6: surface background + theme border, per THEME.md component direction
  // ("minimal/no border, icon-first layout").
  return (
    <div className={`w-full max-w-md space-y-8 rounded-xl bg-theme-surface p-8 shadow-lg border border-theme-border ${className}`}>
      {children}
    </div>
  );
};

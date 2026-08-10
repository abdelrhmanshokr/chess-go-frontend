import React from 'react';

/**
 * Prop definitions for the Button component.
 * Supports standard HTML button attributes and custom variants/sizes.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Standardized Button component for primary and secondary actions.
 * Centralizes styling for buttons to maintain UI consistency and simplify design updates.
 */
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  // Define base styles and dynamic styles based on props.
  const baseStyles = "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  // S2-T6: theme variants use theme.md tokens (accent-primary for the main CTA,
  // surface for secondary actions) instead of the previous zinc palette.
  const variants = {
    primary: "bg-theme-accent-primary text-theme-bg-primary hover:brightness-110 focus-visible:outline-theme-accent-primary",
    secondary: "bg-theme-surface text-theme-text-primary hover:brightness-125 focus-visible:outline-theme-border",
    outline: "border border-theme-border bg-transparent hover:bg-theme-surface text-theme-text-primary",
    ghost: "bg-transparent hover:bg-theme-surface text-theme-text-primary",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};


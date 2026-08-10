import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

/**
 * Reusable Input component with integrated label and standardized styling.
 * Ensures consistent look and feel across all forms in the application.
 */
export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  // S2-T8: theme tokens replace zinc palette so inputs match the new Button/Card styling.
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-theme-text-muted mb-1">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="relative block w-full rounded-md border-0 py-1.5 px-3 bg-theme-bg-primary text-theme-text-primary ring-1 ring-inset ring-theme-border placeholder:text-theme-text-muted focus:z-10 focus:ring-2 focus:ring-inset focus:ring-theme-accent-primary sm:text-sm sm:leading-6"
      />
    </div>
  );
};

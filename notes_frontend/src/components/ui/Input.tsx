import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// PUBLIC_INTERFACE
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
  /** Reusable themed input component with ref forwarding for accessibility and focus control. */
  return <input ref={ref} {...props} className={`input ${className}`} />;
});
Input.displayName = "Input";

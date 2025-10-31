import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
};

// PUBLIC_INTERFACE
export const Button: React.FC<ButtonProps> = ({ variant = "primary", className = "", ...props }) => {
  /** Reusable themed button component. */
  const base = "btn";
  const variantClass =
    variant === "primary" ? "btn-primary" :
    variant === "danger" ? "btn-danger" : "btn-ghost";
  return <button {...props} className={`${base} ${variantClass} ${className}`} />;
};

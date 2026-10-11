import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`input-base ${
          hasError ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

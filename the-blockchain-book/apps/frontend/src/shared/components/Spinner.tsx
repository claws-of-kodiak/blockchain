import React from "react";
import "../../styles/spinner.css";

export interface SpinnerProps {
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ className = "" }) => {
  return (
    <svg
      className={`spinner-icon ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="spinner-track" cx="12" cy="12" r="10" fill="none" />
      <path
        className="spinner-head"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

Spinner.displayName = "Spinner";

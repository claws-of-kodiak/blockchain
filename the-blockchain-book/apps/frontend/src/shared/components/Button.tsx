import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Spinner } from "./Spinner";
import "../../styles/button.css";

export type ButtonVariant = "base" | "hero" | "header"; // Your original archetypes
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "base", // Default global button behavior
      size = "md",
      isLoading = false,
      className = "",
      id = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate clean semantic class keys matching your layout architecture
    const classNames = [
      "btn",
      `btn--${variant}`,
      `btn--${size}`,
      isLoading ? "btn--loading" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || isLoading}
        type={props.type || "button"}
        id={id}
        {...props}
      >
        {isLoading ? (
          <span className="btn__loading-content">
            <Spinner className="btn__spinner" />
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

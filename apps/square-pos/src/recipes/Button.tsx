import React from "react";
import { css, cx } from "~/styled-system/css";

// Button variants and sizes
const buttonVariants = {
  primary: {
    background: "linear-gradient(to right, #2563eb, #4f46e5)",
    color: "white",
    _hover: { bg: "blue.700" },
    _active: { bg: "blue.800" },
  },
  secondary: {
    bg: "gray.200",
    color: "black",
    _hover: { bg: "gray.300" },
    _active: { bg: "gray.400" },
  },
  outline: {
    bg: "white",
    color: "gray.700",
    border: "1px solid #d1d5db",
    _hover: { bg: "gray.50" },
    _active: { bg: "gray.100" },
  },
};

const buttonSizes = {
  md: {
    px: "4",
    py: "2",
    fontSize: "md",
    borderRadius: "md",
  },
  lg: {
    px: "6",
    py: "3",
    fontSize: "lg",
    borderRadius: "lg",
  },
  sm: {
    px: "3",
    py: "1",
    fontSize: "sm",
    borderRadius: "sm",
  },
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  fullWidth?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cx(
          css({
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "semibold",
            transition: "all 0.2s",
            cursor: "pointer",
            w: fullWidth ? "full" : undefined,
            ...buttonVariants[variant],
            ...buttonSizes[size],
          }),
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

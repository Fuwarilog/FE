import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = {
  default:
    "bg-zinc-900 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500",
  outline:
    "border border-zinc-300 text-zinc-900 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500",
  ghost:
    "text-zinc-900 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500",
};

export const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        className={cn(
          "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
          buttonVariants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

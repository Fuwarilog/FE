import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
  {
    variants: {
      checked: {
        true: "bg-blue-600",
        false: "bg-gray-200",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      checked: false,
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
  {
    variants: {
      checked: {
        true: "translate-x-5",
        false: "translate-x-0",
      },
    },
    defaultVariants: {
      checked: false,
    },
  }
);

export const Switch = React.forwardRef(
  ({ className, checked, disabled, onCheckedChange, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => {
          if (!disabled && onCheckedChange) {
            onCheckedChange(!checked);
          }
        }}
        className={cn(
          switchVariants({ checked, disabled }),
          className
        )}
        {...props}
      >
        <span className={thumbVariants({ checked })} />
      </button>
    );
  }
);

Switch.displayName = "Switch";

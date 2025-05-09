import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export const PopoverContent = React.forwardRef((props, ref) => {
  const { className, sideOffset = 4, ...rest } = props;

  return (
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={`z-50 w-auto bg-white border rounded-md shadow-md p-2 animate-in fade-in ${className}`}
      {...rest}
    />
  );
});

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

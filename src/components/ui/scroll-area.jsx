import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

export function ScrollArea({ className, children, ...props }) {
  return (
    <ScrollAreaPrimitive.Root
      className={`relative overflow-hidden ${className || ""}`}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex touch-none select-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out hover:bg-gray-200"
      >
        <ScrollAreaPrimitive.Thumb className="flex-1 bg-gray-400 rounded-full" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

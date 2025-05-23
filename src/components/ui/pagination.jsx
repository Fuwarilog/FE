// src/components/ui/pagination.jsx
import * as React from "react"
import { cn } from "../../lib/utils"

export function Pagination({ className, ...props }) {
  return <nav role="navigation" aria-label="pagination" className={cn("flex justify-center mt-6 mb-10", className)} {...props} />
}

export function PaginationContent({ className, ...props }) {
  return <ul className={cn("flex items-center gap-1", className)} {...props} />
}

export function PaginationItem({ className, ...props }) {
  return <li className={cn("", className)} {...props} />
}

export function PaginationLink({ className, isActive, ...props }) {
  return (
    <a
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium hover:bg-gray-100 hover:text-black",
        isActive ? "border-gray-400 text-black font-semibold" : "border-transparent",
        className
      )}
      {...props}
    />
  )
}

export function PaginationPrevious({ className, ...props }) {
  return (
    <a
      className={cn(
        "inline-flex h-8 px-3 items-center justify-center rounded-md border border-transparent text-sm font-medium hover:bg-gray-100 hover:text-black",
        className
      )}
      {...props}
    >
      <span className="mr-1">&lt;</span> Previous
    </a>
  )
}

export function PaginationNext({ className, ...props }) {
  return (
    <a
      className={cn(
        "inline-flex h-8 px-3 items-center justify-center rounded-md border border-transparent text-sm font-medium hover:bg-gray-100 hover:text-black",
        className
      )}
      {...props}
    >
      Next <span className="ml-1">&gt;</span>
    </a>
  )
}

export function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      className={cn("flex h-8 w-8 items-center justify-center text-sm", className)}
      {...props}
    >
      ...
    </span>
  )
}

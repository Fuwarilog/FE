import * as React from "react";

export function Card({ className, ...props }) {
  return (
    <div
      className={`rounded-xl border bg-white text-black shadow-sm ${className || ""}`}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className || ""}`} {...props} />
  );
}

export function CardTitle({ className,  children,...props }) {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className || ""}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ className, ...props }) {
  return <div className={`p-6 pt-0 ${className || ""}`} {...props} />;
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p
      className={`text-sm text-muted-foreground ${className || ""}`}
      {...props}
    >
      {children}
    </p>
  );
}

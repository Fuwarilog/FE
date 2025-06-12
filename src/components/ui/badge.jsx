import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-gray-300 text-gray-800 bg-white",
        subway: "bg-blue-100 text-blue-800 border-blue-200",
        bus: "bg-green-100 text-green-800 border-green-200",
        walk: "bg-gray-100 text-gray-700 border-gray-300",
        custom: "", // 필요 시 사용자 정의
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
}

export function Progress({ value, className, ...props }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "h-2 w-full rounded-pill bg-light",
        className
      )}
      {...props}
    >
      <div
        className="h-full rounded-pill bg-black transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}


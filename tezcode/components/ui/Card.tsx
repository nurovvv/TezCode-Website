import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-black/10 bg-white shadow-card",
        className
      )}
      {...props}
    />
  );
}


import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-btn border border-black/15 bg-light px-3 py-2 text-sm text-black outline-none",
        "placeholder:text-black/55 focus:border-black focus:ring-1 focus:ring-black",
        className
      )}
      {...props}
    />
  );
}


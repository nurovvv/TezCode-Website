import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/80 disabled:opacity-60 disabled:cursor-not-allowed rounded-btn";

const variants: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-black/90",
  secondary: "border border-black text-black hover:bg-light",
  ghost: "text-black hover:bg-light"
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base"
};

export function Button({ variant = "primary", size = "md", fullWidth, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    />
  );
}


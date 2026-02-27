"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  items: { value: string; label: string }[];
}

export function Tabs({ value, onChange, items }: TabsProps) {
  return (
    <div className="inline-flex rounded-pill bg-light p-1 text-sm">
      {items.map(item => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              "min-w-[96px] rounded-pill px-4 py-1.5 font-medium transition-colors",
              active
                ? "bg-black text-white"
                : "text-black/70 hover:bg-white"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}


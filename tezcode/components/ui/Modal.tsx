import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
      <div className="relative w-full max-w-lg rounded-card border border-black/10 bg-white p-6 shadow-modal">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-black/55 hover:text-black"
            aria-label="Close"
          >
            ×
          </button>
        )}
        {title && (
          <h2 className="mb-4 text-lg font-semibold tracking-tight text-black">
            {title}
          </h2>
        )}
        <div className={cn("space-y-4 text-sm text-black/80")}>{children}</div>
      </div>
    </div>
  );
}


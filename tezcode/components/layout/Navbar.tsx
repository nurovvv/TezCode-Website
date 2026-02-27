"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/for-instructors", label: "For Instructors" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-sm font-semibold tracking-tight text-black">
          TezCode
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-black/70 md:flex">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition hover:text-black",
                pathname === link.href && "font-semibold text-black"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm text-black/75 hover:text-black md:inline-block"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-pill bg-black px-4 py-1.5 text-sm font-semibold text-white"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}


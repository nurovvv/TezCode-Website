import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardShell({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-light text-black">
      <aside className="hidden w-60 flex-shrink-0 border-r border-black/10 bg-white px-4 py-6 md:flex md:flex-col">
        <div className="mb-8 text-sm font-semibold tracking-tight text-black">TezCode</div>
        <nav className="space-y-1 text-sm text-black/70">
          <Link
            href="/dashboard"
            className="block rounded-btn px-3 py-2 hover:bg-light hover:text-black"
          >
            Dashboard
          </Link>
          <Link
            href="/courses"
            className="block rounded-btn px-3 py-2 hover:bg-light hover:text-black"
          >
            My Courses
          </Link>
          <Link
            href="/gradebook"
            className="block rounded-btn px-3 py-2 hover:bg-light hover:text-black"
          >
            Gradebook
          </Link>
          <Link
            href="/settings"
            className="block rounded-btn px-3 py-2 hover:bg-light hover:text-black"
          >
            Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-light">
        <header className="flex items-center justify-between border-b border-black/10 bg-white/90 px-6 py-3">
          <div className="text-xs font-medium text-black/60">
            Good to see you, <span className="text-black">{session.user?.email}</span>
          </div>
          <form action="/api/auth/signout" method="post">
            <button className="rounded-btn border border-black/15 bg-light px-3 py-1 text-xs font-medium text-black/70 hover:border-black/40 hover:text-black">
              Sign out
            </button>
          </form>
        </header>
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}


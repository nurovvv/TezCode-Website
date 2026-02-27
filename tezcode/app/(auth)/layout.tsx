import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <main className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-card border border-black/10 bg-white p-10 shadow-modal">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 text-sm font-semibold tracking-tight text-black">
              TezCode
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-black">Sign in to TezCode</h1>
            <p className="mt-1 text-sm text-black/55">
              Interactive CS textbooks that feel like apps, not PDFs.
            </p>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}


import "./globals.css";
import type { ReactNode } from "react";
import { AppProviders } from "@/components/providers/AppProviders";

export const metadata = {
  title: "TezCode – Learn by Doing",
  description: "Interactive computer science learning platform inspired by ZyBooks."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-light text-black">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

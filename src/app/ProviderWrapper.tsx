"use client";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
  return (
    <SessionProvider basePath="/interactive-lessons/api/auth">
      {children}
    </SessionProvider>
  );
}

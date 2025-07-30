"use client";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
  return (
    <SessionProvider
      basePath={process.env.NEXT_PUBLIC_APP_BASE_PATH + "/api/auth"}
    >
      {children}
    </SessionProvider>
  );
}

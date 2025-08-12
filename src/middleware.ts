// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = { matcher: ["/api/auth/:path*"] };

export function middleware(req: NextRequest) {
  // Replace trailing slash in URL to prevent path ping-ponging.
  const p = req.nextUrl.pathname; // e.g. "/api/auth/session"
  if (p.endsWith("/") && p !== "/api/auth/") {
    const url = req.nextUrl.clone();
    url.pathname = p.replace(/\/+$/, "");
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

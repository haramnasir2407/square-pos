import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root to sign-in page
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = { matcher: ["/", "/signin", "/dashboard"] }; // protected route and root

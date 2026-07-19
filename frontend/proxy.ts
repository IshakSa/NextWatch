import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.cookies.get("auth_token")) {
    const loginUrl = new URL("/login", request.url);

    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/discover/:path*", "/watchlist/:path*"],
};

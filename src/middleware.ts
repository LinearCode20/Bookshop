import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.cookies.get("admin_auth");

  // Protect /custom-action route
  if (request.nextUrl.pathname.startsWith("/custom-action")) {
    if (!auth || auth.value !== "authorized") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/custom-action"],
};

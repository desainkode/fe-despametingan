import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_ROUTES = ["/admin/dashboard"];
const LOGIN_ROUTE = "/admin/login";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isLoginRoute = pathname === LOGIN_ROUTE;

  // Protect admin routes — redirect to login if no token
  if (isAdminRoute && !token) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_ROUTE;
    return NextResponse.redirect(url);
  }

  // Redirect already-logged-in users away from login page
  if (isLoginRoute && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/admin/:path*"],
};

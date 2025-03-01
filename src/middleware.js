import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // ✅ Allow public video file access
        if (pathname === "/background-video.mp4") {
          return true;
        }

        // ✅ Allow authentication routes (Login & Register)
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"||
          pathname === "/subscription"
        ) {
          return true;
        }

        // ✅ Allow public homepage
        if (pathname === "/") {
          return true;
        }

        // ✅ Protect API & user routes (Requires authentication)
        if (
          pathname.startsWith("/api/user") ||
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/subscriptions")
        ) {
          return !!token; // User must be logged in
        }

        return !!token; // ✅ Default: All other routes require authentication
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|background-video.mp4).*)"],
};

import { NextResponse, NextRequest } from "next/server";
import { JWTExtend } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environtment from "./config/environtment";

export async function middleware(request: NextRequest) {
  const token: JWTExtend | null = await getToken({
    req: request,
    secret: environtment.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    if (token) {
      if (token?.user?.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      } else if (token?.user?.role === "user") {
        return NextResponse.redirect(new URL("/dashboard/member", request.url));
      }
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    } else {
      if (
        token?.user?.role === "admin" &&
        !pathname.startsWith("/dashboard/admin")
      ) {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      }
      if (
        token?.user?.role === "user" &&
        !pathname.startsWith("/dashboard/member")
      ) {
        return NextResponse.redirect(new URL("/dashboard/member", request.url));
      }
    }
  }

  if (pathname === "/") {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    } else {
      if (token?.user?.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      }
      if (token?.user?.role === "user") {
        return NextResponse.redirect(new URL("/dashboard/member", request.url));
      }
    }
  }
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};


// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const token = request.cookies.get("token")?.value;
//   const path = request.nextUrl.pathname;

//   // Public Routes
//   const publicPaths = ["/login", "/signup"];

//   if (publicPaths.includes(path)) {
//     if (token) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Protected Routes
//   const protectedPaths = ["/dashboard", "/articles", "/users", "/settings"];

//   if (protectedPaths.some(p => path.startsWith(p))) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/login",
//     "/signup",
//     "/dashboard/:path*",
//     "/articles/:path*",
//     "/users/:path*",
//     "/settings/:path*"
//   ],
// };
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value || null;
  const path = request.nextUrl.pathname;

  const publicPaths = ["/login", "/signup"];
  const isPublic = publicPaths.includes(path);

  // Redirect "/" → "/login"
  if (path === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If public page & user already logged in → go to dashboard
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If private page but user not logged in → login
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard", "/articles/:path*"],
};

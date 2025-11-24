import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const request = req as unknown as NextRequest;
    // Allow access to public routes
    const publicRoutes = [
      "/",
      "/auth/signin",
      "/auth/error",
      "/api/auth",
      "/api/onboarding",
    ];

    const isPublicRoute = publicRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

    if (isPublicRoute) {
      return NextResponse.next();
    }

    // Check if user has completed onboarding
    if (req.nextauth.token) {
      const onboardingCompleted = req.nextauth.token.onboardingCompleted as boolean;

      // Redirect to onboarding if not completed (except if already on onboarding page)
      if (!onboardingCompleted && !request.nextUrl.pathname.startsWith("/onboarding")) {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }

      // Redirect away from onboarding if already completed
      if (onboardingCompleted && request.nextUrl.pathname.startsWith("/onboarding")) {
        return NextResponse.redirect(new URL("/class-selection", request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Public routes that don't require authentication
        const publicRoutes = [
          "/",
          "/auth/signin",
          "/auth/error",
          "/api/auth",
          "/api/onboarding",
        ];

        const isPublicRoute = publicRoutes.some((route) =>
          req.nextUrl.pathname.startsWith(route)
        );

        if (isPublicRoute) {
          return true;
        }

        // All other routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, fonts, uploads (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|images|fonts|uploads).*)",
  ],
};

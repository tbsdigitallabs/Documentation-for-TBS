import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const request = req as unknown as NextRequest;

    // Create response
    let response: NextResponse;

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
      response = NextResponse.next();
    } else {
      // Check if user has completed onboarding
      if (req.nextauth.token) {
        const onboardingCompleted = req.nextauth.token.onboardingCompleted as boolean;

        // Redirect to onboarding if not completed (except if already on onboarding page)
        if (!onboardingCompleted && !request.nextUrl.pathname.startsWith("/onboarding")) {
          response = NextResponse.redirect(new URL("/onboarding", request.url));
        } else if (onboardingCompleted && request.nextUrl.pathname.startsWith("/onboarding")) {
          // Redirect away from onboarding if already completed
          response = NextResponse.redirect(new URL("/class-selection", request.url));
        } else {
          response = NextResponse.next();
        }
      } else {
        response = NextResponse.next();
      }
    }

    // Set CSP header with unsafe-inline and unsafe-eval for Next.js
    // This is required for Next.js to work properly in standalone mode
    // Note: 'unsafe-inline' and 'unsafe-eval' are required for Next.js hydration
    const cspHeader = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com chrome-extension: blob:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com chrome-extension:",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://apis.google.com https://accounts.google.com blob:",
      "frame-src 'self' https://accounts.google.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');

    response.headers.set('Content-Security-Policy', cspHeader);

    return response;
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

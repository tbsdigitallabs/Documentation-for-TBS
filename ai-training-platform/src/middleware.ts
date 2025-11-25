import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

// In development without NEXTAUTH_SECRET, bypass auth middleware entirely
const isDevWithoutAuth = process.env.NODE_ENV === 'development' && !process.env.NEXTAUTH_SECRET;

export default isDevWithoutAuth
  ? async function middleware(req: NextRequest) {
      // Simple middleware for dev without auth - just set CSP and allow all routes
      const response = NextResponse.next();
      response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com chrome-extension: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com chrome-extension:; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://apis.google.com https://accounts.google.com blob:; frame-src 'self' https://accounts.google.com; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self';"
      );
      return response;
    }
  : withAuth(
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
          if (req.nextauth.token) {
            // Check if user has completed onboarding
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
            // No token - redirect to sign in
            response = NextResponse.redirect(new URL("/auth/signin", request.url));
          }
        }

    // Set CSP header - required for Next.js to work
    // Using unsafe-inline and unsafe-eval is necessary for Next.js hydration
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com chrome-extension: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com chrome-extension:; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://apis.google.com https://accounts.google.com blob:; frame-src 'self' https://accounts.google.com; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self';"
    );

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

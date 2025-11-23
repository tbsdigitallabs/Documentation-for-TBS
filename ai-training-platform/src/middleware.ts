import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Singleton PrismaClient for middleware (reused across requests)
let prisma: any = null;

async function getPrisma() {
  if (!prisma) {
    const { PrismaClient } = await import("@prisma/client");
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
  }
  return prisma;
}

export default withAuth(
  async function middleware(req) {
    // Allow access to public routes
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
      return NextResponse.next();
    }

    // Check if user has completed onboarding
    if (req.nextauth.token?.email) {
      try {
        const prismaClient = await getPrisma();
        const user = await prismaClient.user.findUnique({
          where: { email: req.nextauth.token.email as string },
          select: { onboardingCompleted: true },
        });

        // Redirect to onboarding if not completed (except if already on onboarding page)
        if (!user?.onboardingCompleted && !req.nextUrl.pathname.startsWith("/onboarding")) {
          return NextResponse.redirect(new URL("/onboarding", req.url));
        }

        // Redirect away from onboarding if already completed
        if (user?.onboardingCompleted && req.nextUrl.pathname.startsWith("/onboarding")) {
          return NextResponse.redirect(new URL("/class-selection", req.url));
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
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

"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { useEffect, ErrorInfo, Component, ReactNode } from "react";

// Error boundary to catch NextAuth connection errors
class SessionErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log non-connection errors
    if (!error.message.includes("Connection closed")) {
      console.error("SessionProvider error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render children anyway - don't block the app
      return this.props.children;
    }
    return this.props.children;
  }
}

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Suppress connection errors in console
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args: any[]) => {
      const errorStr = args[0]?.toString() || "";
      if (errorStr.includes("Connection closed") || errorStr.includes("next-auth")) {
        // Suppress NextAuth connection errors
        return;
      }
      originalError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      const warnStr = args[0]?.toString() || "";
      if (warnStr.includes("Connection closed") || warnStr.includes("next-auth")) {
        // Suppress NextAuth warnings
        return;
      }
      originalWarn.apply(console, args);
    };

    // Also catch unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes("Connection closed")) {
        event.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return (
    <SessionErrorBoundary>
      <NextAuthSessionProvider
        refetchInterval={0} // Disable automatic polling
        refetchOnWindowFocus={false} // Don't refetch on window focus
        refetchWhenOffline={false} // Don't refetch when offline
        basePath="/api/auth" // Explicitly set base path
      >
        {children}
      </NextAuthSessionProvider>
    </SessionErrorBoundary>
  );
}


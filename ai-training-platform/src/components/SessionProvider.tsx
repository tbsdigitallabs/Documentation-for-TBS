"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { useEffect, useState, useRef } from "react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const errorHandlerSet = useRef(false);

  useEffect(() => {
    setMounted(true);

    // Set up error handlers only once
    if (!errorHandlerSet.current) {
      errorHandlerSet.current = true;

      // Suppress connection errors in console
      const originalError = console.error;
      const originalWarn = console.warn;

      console.error = (...args: any[]) => {
        const errorStr = args[0]?.toString() || "";
        if (errorStr.includes("Connection closed") || errorStr.includes("next-auth")) {
          return;
        }
        originalError.apply(console, args);
      };

      console.warn = (...args: any[]) => {
        const warnStr = args[0]?.toString() || "";
        if (warnStr.includes("Connection closed") || warnStr.includes("next-auth")) {
          return;
        }
        originalWarn.apply(console, args);
      };

      // Catch unhandled promise rejections globally
      const handleRejection = (event: PromiseRejectionEvent) => {
        const errorMsg = event.reason?.message || event.reason?.toString() || "";
        if (errorMsg.includes("Connection closed") || errorMsg.includes("next-auth")) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      window.addEventListener("unhandledrejection", handleRejection);

      // Also catch errors globally
      const handleError = (event: ErrorEvent) => {
        const errorMsg = event.message || event.error?.message || "";
        if (errorMsg.includes("Connection closed")) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      window.addEventListener("error", handleError);
    }
  }, []);

  // Don't render SessionProvider until mounted to avoid hydration issues
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextAuthSessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      {children}
    </NextAuthSessionProvider>
  );
}


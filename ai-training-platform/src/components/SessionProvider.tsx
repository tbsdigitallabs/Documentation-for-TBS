"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
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

    // Catch unhandled promise rejections
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


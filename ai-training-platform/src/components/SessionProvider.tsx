"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Suppress connection errors in console
    const originalError = console.error;
    console.error = (...args: any[]) => {
      if (args[0]?.toString().includes("Connection closed")) {
        // Suppress NextAuth connection closed errors
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <NextAuthSessionProvider
      refetchInterval={0} // Disable automatic polling
      refetchOnWindowFocus={false} // Don't refetch on window focus
      refetchWhenOffline={false} // Don't refetch when offline
    >
      {children}
    </NextAuthSessionProvider>
  );
}


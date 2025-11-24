"use client";

import { useSession as useNextAuthSession } from "next-auth/react";
import { useEffect, useRef } from "react";

// Wrapper around useSession that handles connection errors gracefully
export function useSession() {
  const sessionRef = useRef<any>(null);
  const errorHandlerSet = useRef(false);

  useEffect(() => {
    if (!errorHandlerSet.current) {
      errorHandlerSet.current = true;
      
      // Catch unhandled promise rejections
      const handleRejection = (event: PromiseRejectionEvent) => {
        const errorMsg = event.reason?.message || event.reason?.toString() || "";
        if (errorMsg.includes("Connection closed")) {
          event.preventDefault();
          event.stopPropagation();
        }
      };
      
      window.addEventListener("unhandledrejection", handleRejection, { capture: true });
      
      // Catch errors globally
      const handleError = (event: ErrorEvent) => {
        const errorMsg = event.message || event.error?.message || "";
        if (errorMsg.includes("Connection closed")) {
          event.preventDefault();
          event.stopPropagation();
        }
      };
      
      window.addEventListener("error", handleError, { capture: true });
    }
  }, []);

  try {
    const session = useNextAuthSession();
    sessionRef.current = session;
    return session;
  } catch (error: any) {
    // If connection error, return default session state
    if (error?.message?.includes("Connection closed")) {
      return {
        data: null,
        status: "loading" as const,
        update: async () => {},
      };
    }
    throw error;
  }
}


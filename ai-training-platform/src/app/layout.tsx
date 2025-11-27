import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AuthProvider from "@/components/AuthProvider";
import DavidToast from "@/components/DavidToast";

export const metadata: Metadata = {
  title: "TBS Digital Labs | LearningLab",
  description: "AI Training Platform for TBS Digital Labs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: 'red', color: 'white', zIndex: 9999, textAlign: 'center', padding: '2px', fontSize: '10px', pointerEvents: 'none' }}>
          DEBUG: BUILD 2025-11-27 T03:45 | CYBERPUNK UPDATE
        </div>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <DavidToast />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SessionProvider from "@/components/SessionProvider";
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
        <ThemeProvider>
          <SessionProvider>
            {children}
            <DavidToast />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
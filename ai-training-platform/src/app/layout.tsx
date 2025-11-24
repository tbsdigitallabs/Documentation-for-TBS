import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "TBS Digital Labs - LearningLab",
  description: "Interactive LearningLab for TBS Digital Labs team members. Master AI tools and workflows for your role.",
  keywords: ["AI training", "TBS Digital Labs", "artificial intelligence", "team training", "Australia"],
  authors: [{ name: "TBS Digital Labs" }],
  creator: "TBS Digital Labs",
  publisher: "TBS Digital Labs",
  robots: "noindex, nofollow", // Internal platform
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <script src="/theme-init.js" />
      </head>
      <body className="font-body antialiased">
        <SessionProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
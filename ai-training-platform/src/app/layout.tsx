import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import HeaderNav from "@/components/HeaderNav";
// import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "TBS Digital Labs - AI Training Platform",
  description: "Interactive AI training platform for TBS Digital Labs team members. Master AI tools and workflows for your role.",
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
    <html lang="en-AU">
      <body className="font-body antialiased">
        {/* <SessionProvider> */}
        <ThemeProvider>
          <HeaderNav />
          {children}
        </ThemeProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
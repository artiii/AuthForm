import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import clsx from "clsx";
import { AuthGuard } from "@/shared/ui/auth-guard";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Auth Form App",
  description: "Modern authentication app with protected routes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={clsx(inter.variable, jetbrainsMono.variable)}>
        <ThemeToggle />
        <AuthGuard fallback={<div className="loading-fallback">Loading...</div>}>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}

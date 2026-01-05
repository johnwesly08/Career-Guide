import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Compass",
  description: "Career Compass is an AI-powered career guidance platform that analyzes resumes against job descriptions, identifies skill gaps, calculates match scores, and provides personalized career insights using modern web and AI technologies.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          flex
          min-h-screen
          flex-col
        `}
      >
        {/* App content */}
        <AuthProvider>
          <main className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            {children}
          </main>

        </AuthProvider>

        {/* Footer always at bottom */}
        <Footer />
      </body>
    </html>
  );
}

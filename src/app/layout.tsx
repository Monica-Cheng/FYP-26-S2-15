import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WaitlistModalProvider from "@/components/waitlist/WaitlistModalProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WiseWorkout — Train smarter. Level up.",
  description:
    "The AI-powered fitness app with personalised workout plans, WiseCoach AI, gamification, and progress analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-bg">
        <WaitlistModalProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </WaitlistModalProvider>
      </body>
    </html>
  );
}

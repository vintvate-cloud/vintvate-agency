import type { Metadata } from "next";
import { Suspense } from "react";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vintvate Agency",
  description: "Unapologetically Bold",
  icons: {
    icon: "/vintvatelogo-removebg-preview.png",
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import GSAPWrapper from "@/components/GSAPWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${anton.variable} ${inter.variable} antialiased bg-[#F4F4F4] dark:bg-[#0a0a0a] text-black dark:text-white overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Preloader />
          <GSAPWrapper>
            <CustomCursor />
            <Navbar />
            <Suspense fallback={null}>
              <SmoothScroll>
                {children}
                <Footer />
              </SmoothScroll>
            </Suspense>
          </GSAPWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Inter, Silkscreen } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nanonc4 Portfolio",
  description: "Welcome to my portfolio! A chill space where I share my work, projects, and creative journey.",
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${silkscreen.variable} ${inter.className} bg-black text-white antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

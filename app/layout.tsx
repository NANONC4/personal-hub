import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Personal Hub",
  description: "Digital business card and portfolio hub.",
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

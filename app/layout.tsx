import { Inter, Silkscreen } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const silkscreen = Silkscreen({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://nanonc4-portfolio.vercel.app"),
  title: {
    default: "Chatchai Danrungruang | Creative Developer",
    template: "%s | Chatchai Danrungruang",
  },
  description: "Welcome to my interactive portfolio! A chill space where I share my creative web development, games, and UI/UX projects.",
  keywords: ["Frontend Developer", "React", "Next.js", "Web Development", "Game Developer", "Portfolio", "Pixel Art"],
  authors: [{ name: "Chatchai Danrungruang" }],
  creator: "Chatchai Danrungruang",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nanonc4-portfolio.vercel.app",
    title: "Chatchai Danrungruang | Creative Developer",
    description: "Welcome to my interactive portfolio! A chill space where I share my creative web development, games, and UI/UX projects.",
    siteName: "Chatchai's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chatchai Danrungruang Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatchai Danrungruang | Creative Developer",
    description: "Welcome to my interactive portfolio! A chill space where I share my creative web development, games, and UI/UX projects.",
    images: ["/og-image.png"],
    creator: "@nanonc4",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import TopNavbar from "@/components/TopNavbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${silkscreen.variable} ${inter.className} bg-black text-white antialiased`}>
        <SmoothScroll>
          <TopNavbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

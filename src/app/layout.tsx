import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ethereal Gallery | Senior Fullstack Engineer & Software Architect",
  description:
    "An editorial minimalist portfolio monograph showcasing fullstack software architecture, high-performance systems, and digital case studies.",
  keywords: [
    "Fullstack Engineer",
    "Software Architect",
    "Next.js",
    "TypeScript",
    "Portfolio Monograph",
    "Ethereal Gallery",
  ],
  authors: [{ name: "Senior Fullstack Engineer" }],
  openGraph: {
    title: "Ethereal Gallery | Senior Fullstack Engineer",
    description:
      "An editorial minimalist portfolio monograph showcasing fullstack software architecture and digital case studies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="relative min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-sans selection:bg-[#1a1c1c] selection:text-[#ffffff] flex flex-col">
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Senior Fullstack Engineer | Personal Portfolio",
  description:
    "High-performance software engineer portfolio showcasing fullstack applications, microservices architecture, and technical case studies.",
  keywords: [
    "Fullstack Engineer",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Senior Fullstack Engineer" }],
  openGraph: {
    title: "Senior Fullstack Engineer | Personal Portfolio",
    description:
      "High-performance software engineer portfolio showcasing fullstack applications, microservices architecture, and technical case studies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} dark h-full antialiased`}>
      <body className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col">
        {/* Ambient Glass Glow Lighting Effects */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[140px]" />
          <div className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[130px]" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}

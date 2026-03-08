import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "jerwilcy",
    template: "%s | jerwilcy",
  },
  description: "研究者与开发者，探索机器学习、计算机视觉和创意技术的交叉领域。分享见解、项目和教程。",
  keywords: ["机器学习", "计算机视觉", "AI", "研究", "开发者", "博客", "项目"],
  authors: [{ name: "jerwilcy" }],
  creator: "jerwilcy",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://jerwilcy.dev",
    title: "jerwilcy",
    description: "研究者与开发者，探索机器学习、计算机视觉和创意技术的交叉领域。",
    siteName: "jerwilcy",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "jerwilcy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "jerwilcy",
    description: "研究者与开发者，探索机器学习、计算机视觉和创意技术的交叉领域。",
    images: ["/og-default.png"],
    creator: "@jerwilcy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const display = Chakra_Petch({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://hobbyboyz.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hobby Boyz | Cards, breaks, and the people who love them",
  description:
    "A crew of friends pooling their time to move the hobby forward. Catch us live on Whatnot and keep up on X.",
  openGraph: {
    title: "Hobby Boyz",
    description:
      "Cards, breaks, and the people who love them. Catch us live on Whatnot.",
    url: siteUrl,
    siteName: "Hobby Boyz",
    images: [{ url: "/brand/hobby-boyz-logo.png", width: 3682, height: 1281 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hobby Boyz",
    description: "Cards, breaks, and the people who love them.",
    site: "@HobbyBoyz_",
    images: ["/brand/hobby-boyz-logo.png"],
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
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
        <MotionProvider />
      </body>
    </html>
  );
}

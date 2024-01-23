import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import React from "react";
import { cx } from "@/src/utils";
import Header from "@/src/components/Header";
import Footer from "../components/Footer";
import { siteMetadata } from "../utils/siteMetadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

const {
  title: siteTitle,
  description: siteDescription,
  siteUrl,
  socialBanner,
  locale,
  author,
} = siteMetadata;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${siteTitle}`,
    default: siteTitle,
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    images: [socialBanner],
    locale: locale,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: author,
    images: [socialBanner],
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
        className={cx(inter.variable, manrope.variable, "font-mr bg-light")}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

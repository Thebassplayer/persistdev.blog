import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";

import Header from "@/src/components/Header";
import Footer from "../components/Footer";
import { siteMetadata } from "../utils/siteMetadata";
import Script from "next/script";
import GoogleAnalytics from "../components/GoogleAnalytics";
import ToastProvider from "../lib/react-toastify/ToastProvider";
import { cx } from "../utils/cx";
import { SearchModal } from "../components/SearchModal/SearchModal";
import { allPosts, Post } from "@/.contentlayer/generated";

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
      <head>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <meta
          name="google-site-verification"
          content="_yFDj3ZFcpCdUJ2n7v7G3jFgOoqdmNruyo4DPD0ueHg"
        />
      </head>
      <body
        className={cx(
          inter.variable,
          manrope.variable,
          "flex min-h-screen flex-col bg-light font-mr dark:bg-dark",
        )}
      >
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }`}
        </Script>
        <ToastProvider>
          <Header />
          {children}
          <Footer />
        </ToastProvider>
        <Suspense fallback={<>Loading...</>}>
          <SearchModal posts={allPosts} />
        </Suspense>
      </body>
    </html>
  );
}

import HomePageClient from "@/components/HomePageClient";
import Loader from "@/components/Loader";
import { getHomepageSchema, getWebsiteSchema, getOrganizationSchema } from '@/lib/schema';
import Schema from '@/components/Schema';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'UtilToolkits | Your Free Online Developer Toolbox',
  description: 'A comprehensive suite of nearly 30 free, browser-based utilities for developers. Includes Case Converter, JSON Formatter, Base64 Encoder, Password Generator, and dozens more. Fast, private, and easy to use.',
  keywords: 'developer tools, online tools, free utilities, JSON formatter, base64 encoder, password generator, case converter, browser tools, productivity tools',
  authors: [{ name: 'UtilToolkits Team' }],
  openGraph: {
    title: 'UtilToolkits | Your Free Online Developer Toolbox',
    description: 'A comprehensive suite of nearly 30 free, browser-based utilities for developers. Fast, private, and easy to use.',
    type: 'website',
    url: 'https://utiltoolkits.com',
    siteName: 'UtilToolkits',
    images: [
      {
        url: 'https://utiltoolkits.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UtilToolkits - Free Developer Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UtilToolkits | Your Free Online Developer Toolbox',
    description: 'A comprehensive suite of nearly 30 free, browser-based utilities for developers. Fast, private, and easy to use.',
    images: ['https://utiltoolkits.com/og-image.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  return (
    <>
      {/* Schema Markup */}
      <Schema schema={getWebsiteSchema()} />
      <Schema schema={getOrganizationSchema()} />
      <Schema schema={getHomepageSchema()} />
      
      <Suspense fallback={<Loader />}>
        <HomePageClient />
      </Suspense>
    </>
  );
}
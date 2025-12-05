import HomePageClient from '@/components/HomePageClient';
import Loader from '@/components/Loader';
import {
  getHomepageSchema,
  getWebsiteSchema,
  getOrganizationSchema,
} from '@/lib/schema';
import Schema from '@/components/Schema';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'UtilToolkits | Your Free Online Developer Toolbox',
  description:
    'Your comprehensive free online developer toolbox with 50+ browser-based utilities. Includes JSON formatter, Base64 encoder, password generator, image tools, text converters, and more. All tools run locally for maximum speed and privacy.',
  keywords:
    'developer tools, online tools, free utilities, JSON formatter, base64 encoder, password generator, image tools, text tools, converter tools, browser tools, productivity tools, web development tools, frontend tools, coding utilities',
  authors: [{ name: 'UtilToolkits Team' }],
  creator: 'UtilToolkits',
  publisher: 'UtilToolkits',
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
  openGraph: {
    title: 'UtilToolkits | Your Free Online Developer Toolbox',
    description:
      'Your comprehensive free online developer toolbox with 50+ browser-based utilities. All tools run locally for maximum speed and privacy.',
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
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UtilToolkits | Your Free Online Developer Toolbox',
    description:
      'Your comprehensive free online developer toolbox with 50+ browser-based utilities. All tools run locally for maximum speed and privacy.',
    images: ['https://utiltoolkits.com/og-image.png'],
    creator: '@utiltoolkits',
  },
  alternates: {
    canonical: '/',
  },
  other: {
    'theme-color': '#3b82f6',
    'msapplication-TileColor': '#3b82f6',
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

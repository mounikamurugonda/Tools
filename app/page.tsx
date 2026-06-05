import HomePageClient from '@/components/HomePageClient';
import { HomeSkeleton } from '@/components/SkeletonLoader';
import { getHomepageSchema, getWebsiteSchema, getOrganizationSchema } from '@/lib/schema';
import Schema from '@/components/Schema';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'UtilToolkits | Free Browser Tools for Developers & AI Workflows',
  description:
    'Stop wasting AI tokens on tasks tools can do instantly. 100+ free browser-based utilities — AI token counter, prompt builder, JSON formatter, CSV converter, image tools, and more. All processing is local: no upload, no tracking, no cost.',
  keywords:
    'developer tools, free online tools, ai token counter, prompt builder, json formatter, csv to json, browser tools, free utilities, no upload tools, privacy tools, ai workflow tools, token counter, context window calculator, image tools, text converter, coding tools, ai tools free',
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
    title: 'UtilToolkits — 100+ Free Browser Tools for Developers & AI Workflows',
    description:
      'Free AI token counter, prompt builder, JSON formatter, CSV converter, image tools, and 100+ more browser utilities. No upload, no tracking, no cost.',
    type: 'website',
    url: 'https://utiltoolkits.com',
    siteName: 'UtilToolkits',
    images: [
      {
        url: 'https://utiltoolkits.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UtilToolkits - Free Browser Tools for Developers & AI Workflows',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UtilToolkits — Free Browser Tools for Developers & AI Workflows',
    description:
      'AI token counter, prompt builder, JSON formatter, CSV converter, image tools and 100+ more — all free, all browser-based, no data upload.',
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

      <Suspense fallback={<HomeSkeleton />}>
        <HomePageClient />
      </Suspense>
    </>
  );
}
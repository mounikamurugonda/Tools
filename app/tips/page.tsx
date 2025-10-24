import { getTipsPageSchema, getWebsiteSchema, getOrganizationSchema } from '@/lib/schema';
import Schema from '@/components/Schema';
import AnalyticsWrapper from '@/components/AnalyticsWrapper';
import { Metadata } from 'next';
import TipsPageLayout from '@/components/TipsPageLayout';
import TipsPageClient from '@/components/TipsPageClient';

export const metadata: Metadata = {
  title: 'Helpful Tips & Tricks for Developers | UtilToolkits',
  description: 'A comprehensive collection of tips and tricks for productivity, coding, design, and more to help you work smarter. Expert advice for developers and designers to boost your workflow and efficiency.',
  keywords: 'productivity tips, coding tips, design tips, developer tips, programming advice, workflow optimization, development best practices, coding shortcuts, design techniques, productivity hacks',
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
    title: 'Helpful Tips & Tricks for Developers | UtilToolkits',
    description: 'A comprehensive collection of tips and tricks for productivity, coding, design, and more to help you work smarter. Expert advice for developers and designers.',
    type: 'website',
    url: 'https://utiltoolkits.com/tips',
    siteName: 'UtilToolkits',
    images: [
      {
        url: 'https://utiltoolkits.com/og-tips.png',
        width: 1200,
        height: 630,
        alt: 'Helpful Tips & Tricks for Developers',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Helpful Tips & Tricks for Developers',
    description: 'A comprehensive collection of tips and tricks for productivity, coding, design, and more to help you work smarter.',
    images: ['https://utiltoolkits.com/og-tips.png'],
    creator: '@utiltoolkits',
  },
  alternates: {
    canonical: '/tips',
  },
  other: {
    'theme-color': '#3b82f6',
    'msapplication-TileColor': '#3b82f6',
  },
};

export default function TipsPage() {
  const title = "Helpful Tips & Tricks";
  const description = "Discover expert tips and tricks to boost your productivity, improve your coding skills, and enhance your workflow. From keyboard shortcuts to design principles, these insights will help you work smarter and more efficiently.";

  return (
    <AnalyticsWrapper pageType="tips">
      {/* Schema Markup */}
      <Schema schema={getWebsiteSchema()} />
      <Schema schema={getOrganizationSchema()} />
      <Schema schema={getTipsPageSchema()} />
      
      <TipsPageLayout title={title} description={description}>
        <TipsPageClient />

        {/* Call to Action */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center mt-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Want More Tips?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Have a great tip to share? Found something that works well for you? We&apos;d love to hear from you!
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Share Your Tips
          </a>
        </div>
      </TipsPageLayout>
    </AnalyticsWrapper>
  );
}
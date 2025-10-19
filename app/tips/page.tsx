import { TIPS } from '@/lib/tips';
import { getTipsPageSchema, getWebsiteSchema, getOrganizationSchema } from '@/lib/schema';
import Schema from '@/components/Schema';
import AnalyticsWrapper from '@/components/AnalyticsWrapper';
import { Metadata } from 'next';
import TipsPageLayout from '@/components/TipsPageLayout';
import TipCard from '@/components/TipCard';

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
        {/* Introduction Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why These Tips Matter</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            In the fast-paced world of development and design, small improvements can make a huge difference. These tips and tricks have been curated from real-world experience, helping you:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Work Faster</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Keyboard shortcuts, automation tips, and workflow optimizations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Code Better</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Best practices, debugging techniques, and clean code principles</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🎨</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Design Smarter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">UI/UX insights, color theory, and visual design tips</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Stay Productive</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Time management, focus techniques, and productivity hacks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse All Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIPS.map((tip, index) => (
              <TipCard key={index} tip={tip} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
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

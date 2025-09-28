import { TIPS } from '@/lib/tips';
import { InlineAd } from '@/components/AdContainer';
import { getTipsPageSchema, getWebsiteSchema, getOrganizationSchema } from '@/lib/schema';
import Schema from '@/components/Schema';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Helpful Tips & Tricks | UtilToolkits',
  description: 'A collection of tips and tricks for productivity, coding, design, and more to help you work smarter. Expert advice for developers and designers.',
  keywords: 'productivity tips, coding tips, design tips, developer tips, programming advice, workflow optimization',
  authors: [{ name: 'UtilToolkits Team' }],
  openGraph: {
    title: 'Helpful Tips & Tricks | UtilToolkits',
    description: 'A collection of tips and tricks for productivity, coding, design, and more to help you work smarter.',
    type: 'website',
    url: 'https://utiltoolkits.com/tips',
    siteName: 'UtilToolkits',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Helpful Tips & Tricks | UtilToolkits',
    description: 'A collection of tips and tricks for productivity, coding, design, and more to help you work smarter.',
  },
  alternates: {
    canonical: '/tips',
  },
};

const TipCard = ({ tip }: { tip: { category: string; content: string } }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
    <span className="text-sm font-semibold text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">{tip.category}</span>
    <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{tip.content}</p>
  </div>
);

export default function TipsPage() {
  return (
    <>
      {/* Schema Markup */}
      <Schema schema={getWebsiteSchema()} />
      <Schema schema={getOrganizationSchema()} />
      <Schema schema={getTipsPageSchema()} />
      
      <div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Helpful Tips & Tricks</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            A collection of little nuggets of wisdom to help you work smarter, design better, and stay productive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIPS.map((tip, index) => (
            <TipCard key={index} tip={tip} />
          ))}
        </div>
        
        {/* Ad Container */}
        <InlineAd key="tips-inline-ad" />
      </div>
    </>
  );
}

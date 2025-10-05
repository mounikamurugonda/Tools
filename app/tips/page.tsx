import { TIPS } from '@/lib/tips';
import { InlineAd } from '@/components/AdContainer';
import { getTipsPageSchema, getWebsiteSchema, getOrganizationSchema } from '@/lib/schema';
import Schema from '@/components/Schema';
import AnalyticsWrapper from '@/components/AnalyticsWrapper';
import { Metadata } from 'next';
import TipsPageLayout from '@/components/TipsPageLayout';
import TipCard from '@/components/TipCard';

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

export default function TipsPage() {
  const title = "Helpful Tips & Tricks";
  const description = "A collection of little nuggets of wisdom to help you work smarter, design better, and stay productive. Select a category from the sidebar to get started.";

  return (
    <AnalyticsWrapper pageType="tips">
      {/* Schema Markup */}
      <Schema schema={getWebsiteSchema()} />
      <Schema schema={getOrganizationSchema()} />
      <Schema schema={getTipsPageSchema()} />
      
      <TipsPageLayout title={title} description={description}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIPS.map((tip, index) => (
            <TipCard key={index} tip={tip} />
          ))}
        </div>
        
        {/* Ad Container */}
        <div className="mt-8">
            <InlineAd key="tips-inline-ad" />
        </div>
      </TipsPageLayout>
    </AnalyticsWrapper>
  );
}

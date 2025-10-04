import { TIPS } from '@/lib/tips';
import { InlineAd } from '@/components/AdContainer';
import { getTipsPageSchema, getWebsiteSchema, getOrganizationSchema } from '@/lib/schema';
import Schema from '@/components/Schema';
import AnalyticsWrapper from '@/components/AnalyticsWrapper';
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
  <div className="brand-card p-6">
    <span className="brand-badge">{tip.category}</span>
    <p className="mt-4 brand-text-body">{tip.content}</p>
  </div>
);

export default function TipsPage() {
  return (
    <AnalyticsWrapper pageType="tips">
      {/* Schema Markup */}
      <Schema schema={getWebsiteSchema()} />
      <Schema schema={getOrganizationSchema()} />
      <Schema schema={getTipsPageSchema()} />
      
      <div className="brand-fade-in">
        <div className="text-center mb-12">
          <h1 className="brand-heading-2">Helpful Tips & Tricks</h1>
          <p className="mt-4 max-w-2xl mx-auto brand-subheading">
            A collection of little nuggets of wisdom to help you work smarter, design better, and stay productive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIPS.map((tip, index) => (
            <TipCard key={index} tip={tip} />
          ))}
        </div>
        
        {/* Ad Container */}
        <div className="mt-8">
            <InlineAd key="tips-inline-ad" />
        </div>
      </div>
    </AnalyticsWrapper>
  );
}

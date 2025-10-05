import { TIPS } from '@/lib/tips';
import { InlineAd } from '@/components/AdContainer';
import { getTipsPageSchema, getWebsiteSchema, getOrganizationSchema } from '@/lib/schema';
import Schema from '@/components/Schema';
import AnalyticsWrapper from '@/components/AnalyticsWrapper';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TipsPageLayout from '@/components/TipsPageLayout';
import TipCard from '@/components/TipCard';

type Props = {
  params: { categoryName: string };
};

// Helper to format category names for display
const formatCategoryName = (slug: string) => {
  if (!slug) return '';
  const words = slug.split('-');
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = decodeURIComponent(params.categoryName);
  const formattedCategoryName = formatCategoryName(categoryName);
  
  const categoryExists = TIPS.some(tip => tip.category.toLowerCase() === formattedCategoryName.toLowerCase());
  
  if (!categoryExists) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${formattedCategoryName} Tips | UtilToolkits`,
    description: `A collection of tips and tricks for ${formattedCategoryName.toLowerCase()} to help you work smarter.`,
    keywords: `${formattedCategoryName.toLowerCase()} tips, productivity tips, coding tips, design tips`,
    alternates: {
      canonical: `/tips/category/${categoryName}`,
    },
  };
}

export default function TipsCategoryPage({ params }: Props) {
  const categoryName = decodeURIComponent(params.categoryName);
  const formattedCategoryName = formatCategoryName(categoryName);
  
  const tipsForCategory = TIPS.filter(
    tip => tip.category.toLowerCase() === formattedCategoryName.toLowerCase()
  );

  if (tipsForCategory.length === 0) {
    notFound();
  }

  const title = `${formattedCategoryName} Tips`;
  const description = `A collection of nuggets of wisdom for ${formattedCategoryName.toLowerCase()}.`;

  return (
    <AnalyticsWrapper pageType={`tips-${categoryName}`}>
      {/* Schema Markup */}
      <Schema schema={getWebsiteSchema()} />
      <Schema schema={getOrganizationSchema()} />
      <Schema schema={getTipsPageSchema()} />
      
      <TipsPageLayout title={title} description={description}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tipsForCategory.map((tip, index) => (
            <TipCard key={index} tip={tip} />
          ))}
        </div>
        
        {/* Ad Container */}
        <div className="mt-8">
          <InlineAd key={`tips-${categoryName}-inline-ad`} />
        </div>
      </TipsPageLayout>
    </AnalyticsWrapper>
  );
}

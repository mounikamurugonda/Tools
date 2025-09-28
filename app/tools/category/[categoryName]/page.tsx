import { TOOLS, CATEGORY_ORDER, CATEGORY_CONTENT } from '@/constants';
import ToolCard from '@/components/ToolCard';
import Link from 'next/link';
import { ToolCategory } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { categoryName: string };
};

const getCategoryFromParam = (param: string): ToolCategory | undefined => {
  const decodedCategory = decodeURIComponent(param);
  return CATEGORY_ORDER.find(c => c.toLowerCase() === decodedCategory.toLowerCase());
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryFromParam(params.categoryName);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category} Tools`,
    description: `A collection of ${category} tools to streamline your workflow.`,
  };
}

export async function generateStaticParams() {
  return CATEGORY_ORDER.map(category => ({
    categoryName: encodeURIComponent(category),
  }));
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryFromParam(params.categoryName);

  if (!category) {
    notFound();
  }

  const tools = TOOLS.filter(tool => tool.category === category);
  const content = CATEGORY_CONTENT[category];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{category} Tools</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{content.introduction}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Why You'll Love These Tools</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                {content.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 flex-shrink-0">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Perfect For</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                {content.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2 flex-shrink-0">→</span>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Explore {category} Tools</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Here are all the tools available in this category. Click on any to get started!</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <Link key={tool.id} href={`/tools/${tool.id}`} className="block">
            <ToolCard tool={tool} />
          </Link>
        ))}
      </div>
      
      {tools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400">No tools found in this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

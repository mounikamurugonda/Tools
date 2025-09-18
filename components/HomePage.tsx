import React from 'react';
import { TOOLS } from '../constants';
import ToolCard from './ToolCard';
import type { Tool } from '../types';
import { ToolCategory } from '../types';
import { 
    TextCategoryIcon, 
    ImageCategoryIcon, 
    CssCategoryIcon, 
    CodeCategoryIcon, 
    ColorCategoryIcon,
    MathCategoryIcon,
    ProductivityCategoryIcon,
    FunCategoryIcon,
    MiscCategoryIcon 
} from './icons';

interface HomePageProps {
  onSelectTool: (id: string) => void;
}

export const CATEGORY_ORDER: ToolCategory[] = [
    ToolCategory.TEXT,
    ToolCategory.CODING,
    ToolCategory.IMAGE,
    ToolCategory.CSS,
    ToolCategory.COLOR,
    ToolCategory.MATH,
    ToolCategory.PRODUCTIVITY,
    ToolCategory.FUN,
    ToolCategory.MISC,
];

export const CATEGORY_ICONS: Record<ToolCategory, React.FC> = {
    [ToolCategory.TEXT]: TextCategoryIcon,
    [ToolCategory.CODING]: CodeCategoryIcon,
    [ToolCategory.IMAGE]: ImageCategoryIcon,
    [ToolCategory.CSS]: CssCategoryIcon,
    [ToolCategory.COLOR]: ColorCategoryIcon,
    [ToolCategory.MATH]: MathCategoryIcon,
    [ToolCategory.PRODUCTIVITY]: ProductivityCategoryIcon,
    [ToolCategory.FUN]: FunCategoryIcon,
    [ToolCategory.MISC]: MiscCategoryIcon,
};


const HomePage: React.FC<HomePageProps> = ({ onSelectTool }) => {
  const groupedTools = TOOLS.reduce((acc, tool) => {
    (acc[tool.category] = acc[tool.category] || []).push(tool);
    return acc;
  }, {} as Record<ToolCategory, Tool[]>);

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="space-y-12">
        {CATEGORY_ORDER.map((category) => {
          const tools = groupedTools[category];
          if (!tools || tools.length === 0) return null;
          
          const CategoryIcon = CATEGORY_ICONS[category];

          return (
            <section key={category}>
              <div className="flex items-center mb-6">
                {CategoryIcon && <CategoryIcon />}
                <h2 className="text-2xl font-bold text-white tracking-wide">{category}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
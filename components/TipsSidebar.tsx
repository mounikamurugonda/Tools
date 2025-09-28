'use client';

import Link from 'next/link';
import { TOOLS } from '@/constants';
import { LightbulbIcon } from './icons';
import ToolCard from './ToolCard';
import { SidebarAd } from './AdContainer';

const TipsSidebar = () => {
  // Hand-picking a few interesting and popular tools to recommend
  const recommendedTools = TOOLS.filter(tool => 
    ['json-formatter', 'image-to-base64', 'password-generator', 'pomodoro-timer', 'case-converter', 'color-converter'].includes(tool.id)
  );

  return (
    <aside className="w-full md:w-[25%] lg:w-[20%] flex-shrink-0 md:sticky md:top-4 md:h-[calc(100vh-2rem)] overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6">
        <LightbulbIcon className="w-6 h-6 text-yellow-500 mr-3" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommended Tools</h2>
      </div>
      
      <div className="space-y-3">
        {recommendedTools.map(tool => (
          <Link key={tool.id} href={`/tools/${tool.id}`} className="block">
            <ToolCard tool={tool} isCompact />
          </Link>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Pro Tip</h3>
        <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
          Bookmark your frequently used tools for quick access!
        </p>
        <Link 
          href="/tools" 
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          Browse All Tools →
        </Link>
      </div>
      
      {/* Sidebar Ad */}
      <SidebarAd />
    </aside>
  );
};

export default TipsSidebar;

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
    <aside className="hidden md:block w-full md:w-72 flex-shrink-0 h-[calc(100vh-81px)] overflow-y-auto sidebar-scroll brand-fade-in">
      <div className="sticky top-2 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <LightbulbIcon className="w-6 h-6 text-yellow-500 mr-3" />
            <h2 className="brand-heading-4">Recommended Tools</h2>
          </div>
          
          <div className="space-y-2">
            {recommendedTools.map(tool => (
              <Link key={tool.id} href={`/tools/${tool.id}`} className="block">
                <ToolCard tool={tool} isCompact />
              </Link>
            ))}
          </div>
        </div>
      
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 shadow-sm border border-blue-200 dark:border-blue-700">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Pro Tip</h3>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
            Bookmark your frequently used tools for quick access!
          </p>
          <Link 
            href="/tools" 
            className="brand-text-link text-sm"
          >
            Browse All Tools →
          </Link>
        </div>
        
        {/* Sidebar Ad */}
        <div className="mt-6">
            <SidebarAd key="tips-sidebar-ad" />
        </div>
      </div>
    </aside>
  );
};

export default TipsSidebar;

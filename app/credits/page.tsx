import React from 'react';
import Link from 'next/link';
import { SITE_CREDITS, TOOL_CREDITS } from '@/lib/credits';
import { TOOLS } from '@/constants';

export const metadata = {
  title: 'Credits | UtilToolkits',
  description: 'Acknowledgements and credits for open-source libraries, icons, and frameworks used across UtilToolkits.',
};

export default function CreditsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="brand-title mb-2">Credits</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">We gratefully acknowledge the open-source projects and creators that make UtilToolkits possible.</p>

      <section className="mb-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Site-wide</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
          {SITE_CREDITS.map((c) => (
            <li key={c.label}>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 dark:hover:text-blue-400">{c.label}</a>
              ) : (
                <span>{c.label}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Per Tool</h2>
        <div className="space-y-6">
          {TOOLS.map((tool) => {
            const credits = TOOL_CREDITS[tool.id];
            if (!credits || credits.length === 0) return null;
            return (
              <div key={tool.id}>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  <Link href={`/tools/${tool.id}`} className="hover:underline">{tool.name}</Link>
                </h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                  {credits.map((c, idx) => (
                    <li key={`${tool.id}-${idx}`}>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 dark:hover:text-blue-400">{c.label}</a>
                      ) : (
                        <span>{c.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}



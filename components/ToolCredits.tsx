import React from 'react';

interface CreditItem {
  label: string;
  href?: string;
}

interface ToolCreditsProps {
  items: CreditItem[];
}

const ToolCredits: React.FC<ToolCreditsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
      <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="uppercase tracking-wide text-[10px] text-gray-400 dark:text-gray-500">
          Credits:
        </span>
        {items.map((item, idx) => (
          <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-1">
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-700 dark:hover:text-gray-200"
              >
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
            {idx < items.length - 1 && <span>•</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ToolCredits;

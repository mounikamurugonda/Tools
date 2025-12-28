import React from 'react';

interface TipCardProps {
  tip: {
    category: string;
    content: string;
  };
}

const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  return (
    <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 my-8 border border-blue-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 dark:bg-gray-700 rounded-full p-2 mr-4">
          <svg
            className="w-6 h-6 text-blue-500 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l.707-.707M6.343 17.657l-.707.707m12.728 0l.707.707M12 21v-1m0-16a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
          Quick Tip: {tip.category}
        </h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{tip.content}</p>
    </div>
  );
};

export default TipCard;

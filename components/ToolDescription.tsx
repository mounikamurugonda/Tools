import React, { useState } from 'react';
import type { ToolDetails } from '@/types';
import { ChevronDownIcon } from './icons';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left text-lg font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-2 rounded-md"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-4 px-2 prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

interface ToolDescriptionProps {
  details: ToolDetails;
}

const ToolDescription: React.FC<ToolDescriptionProps> = ({ details }) => {
  return (
    <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">About this Tool</h3>
      <p className="mb-6 text-gray-600 dark:text-gray-400">{details.introduction}</p>
      <div className="space-y-1">
        {details.explanation && (
          <AccordionItem title="How does it work?">
            <p>{details.explanation}</p>
          </AccordionItem>
        )}
        {details.howToUse && details.howToUse.length > 0 && (
          <AccordionItem title="How to Use">
            <ol className="list-decimal pl-5 space-y-1">
              {details.howToUse.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </AccordionItem>
        )}
        {details.usageExamples && details.usageExamples.length > 0 && (
          <AccordionItem title="Usage Examples">
            <ul className="list-disc pl-5 space-y-1">
              {details.usageExamples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </AccordionItem>
        )}
        {details.features && details.features.length > 0 && (
          <AccordionItem title="Key Features">
            <ul className="list-disc pl-5 space-y-1">
              {details.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </AccordionItem>
        )}
        {details.underlyingConcept && (
          <AccordionItem title="Underlying Concept">
            <p>{details.underlyingConcept}</p>
          </AccordionItem>
        )}
        {details.faqs && details.faqs.length > 0 && (
          <AccordionItem title="Frequently Asked Questions">
            <div className="space-y-4">
              {details.faqs.map((faq, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">{faq.question}</h4>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </AccordionItem>
        )}
        <AccordionItem title="Data Privacy">
          <p>{details.privacy}</p>
        </AccordionItem>
      </div>
    </div>
  );
};

export default ToolDescription;

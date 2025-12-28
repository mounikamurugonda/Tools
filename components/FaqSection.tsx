'use client';

import React, { useState } from 'react';
// Actually, let's use standard heroicons or just SVG elements to be safe and avoiding missing imports if icons/index.ts doesn't have them.
// Checking icons/index.ts would be good but I'll write inline SVGs for now to be self-contained and consistent with style.

interface FAQ {
  question: string;
  answer: string;
}

const FAQs: FAQ[] = [
  {
    question: 'Is UtilToolkits free to use?',
    answer:
      'Yes, all tools on UtilToolkits are completely free to use. There are no hidden fees, premium tiers, or subscription models.',
  },
  {
    question: 'Does it work without an internet connection?',
    answer:
      'Most of our tools are designed to run client-side in your browser. Once the page is loaded, many utilities can function without an active internet connection, though some specific features may require connectivity.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We prioritize your privacy. Since our tools run locally in your browser, your data (like images you convert or text you format) is processed on your device and is never sent to our servers.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No account registration is required. You can start using any tool immediately without signing up or providing any personal information.',
  },
  {
    question: 'Can I request a new tool?',
    answer:
      'Yes! We love feedback. If you have an idea for a tool that would make your workflow easier, please use our request form or contact us. We regularly update our suite based on developer needs.',
  },
  {
    question: 'Does it work on mobile devices?',
    answer:
      'Yes, UtilToolkits is fully responsive and optimized for mobile devices, tablets, and desktops, so you can work from anywhere.',
  },
  {
    question: 'Are the results accurate?',
    answer:
      'We strive for 100% accuracy. Our tools are built using standard algorithms and libraries. However, for critical tasks, we always recommend double-checking important results.',
  },
  {
    question: 'How can I support the project?',
    answer:
      "The best way to support us is by sharing UtilToolkits with your colleagues and friends! You can also check our 'Buy Me a Coffee' section if you'd like to make a donation.",
  },
];

const FaqItem = ({ faq }: { faq: FAQ }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-8">
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 ml-4 p-1 rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-300 ${isOpen ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 rotate-180' : 'group-hover:border-blue-300 dark:group-hover:border-blue-700'}`}
        >
          <svg
            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'group-hover:text-blue-500'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
};

const FaqSection = () => {
  return (
    <section id="faq" className="mb-16 sm:mb-20 lg:mb-24 scroll-mt-24">
      <div className="text-center mb-10 sm:mb-12 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 px-4">
          Frequently Asked Questions
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          Common questions about UtilToolkits answered for you.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 px-6 sm:px-8">
          {FAQs.map((faq, index) => (
            <FaqItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

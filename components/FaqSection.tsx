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
      'Yes, every tool on UtilToolkits is completely free — no hidden fees, no premium tiers, no subscription. The AI Tools category (token counter, prompt builder, model comparator, etc.) is also fully free with no API key required.',
  },
  {
    question: 'Why should I use these tools instead of just asking ChatGPT or Claude?',
    answer:
      'AI models are powerful but expensive for mechanical tasks. Formatting JSON, converting CSV, counting tokens, or diffing two files costs real AI tokens when you use a chatbot — and these tasks don\'t require intelligence, just algorithms. Our browser tools do the same work in milliseconds at zero cost, and your data never leaves your device.',
  },
  {
    question: 'What AI tools are available?',
    answer:
      'The AI Tools category includes an AI Token Counter (counts tokens for GPT-4o, Claude, Gemini, and more), AI Prompt Builder (structured prompt engineering), CSV to AI Prompt, JSON to AI Prompt, System Prompt Generator, Context Window Calculator, AI Model Comparator, Prompt Template Library, AI Text Chunker, and AI Output Formatter. All are free and browser-based.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. All processing happens locally in your browser — no data is ever sent to our servers. This is especially important for the AI tools: your prompts, documents, and datasets never leave your device. You can verify this in your browser\'s DevTools Network tab.',
  },
  {
    question: 'Do these tools handle large files?',
    answer:
      'Yes, most tools are designed for large data. The CSV to AI Prompt tool handles files up to 50 MB. The JSON Formatter handles files up to ~10 MB. The AI Text Chunker can process any size document (memory-permitting). The Token Counter and Context Window Calculator handle arbitrarily large text.',
  },
  {
    question: 'Does it work without an internet connection?',
    answer:
      'Once the page is loaded, most tools work offline — they run entirely in your browser. The AI tools (token counter, prompt builder, etc.) are all offline-capable since they don\'t call any external APIs.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No account or sign-up is required. Open any tool and start using it immediately.',
  },
  {
    question: 'Can I request a new tool?',
    answer:
      'Yes! We prioritize requests from developers and AI practitioners. Use the request form or contact page to suggest a tool. We\'ve added tools based on community requests many times.',
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

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TOOLS } from '@/constants';

export const metadata: Metadata = {
  title: 'About UtilToolkits - Free Browser-Based Developer Tools',
  description:
    'UtilToolkits is a free collection of 120+ online developer tools — JSON formatter, image compressor, CSS generators, text converters, and more. 100% browser-based, no upload, no signup, privacy-first.',
  keywords:
    'about utilToolkits, free online developer tools, browser-based utilities, coding tools free, privacy-first tools, json tools, image converters, text processing tools, css generators, online tool collection',
  authors: [{ name: 'UtilToolkits' }],
  creator: 'UtilToolkits',
  publisher: 'UtilToolkits',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'About UtilToolkits — Free Browser-Based Developer Tools',
    description:
      '120+ free online developer tools. JSON formatter, image compressor, CSS generators, text utilities — all browser-based, no upload, no signup.',
    type: 'website',
    url: 'https://utiltoolkits.com/about',
    siteName: 'UtilToolkits',
    images: [
      {
        url: 'https://utiltoolkits.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'About UtilToolkits - Free Developer Tools',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About UtilToolkits — Free Browser-Based Developer Tools',
    description:
      '120+ free online developer tools — JSON formatter, image compressor, CSS generators and more. No upload, no signup.',
    images: ['https://utiltoolkits.com/og-image.png'],
    creator: '@utiltoolkits',
  },
  alternates: {
    canonical: '/about',
  },
  other: {
    'theme-color': '#3b82f6',
    'msapplication-TileColor': '#3b82f6',
  },
};

export default function AboutPage() {
  const toolCount = TOOLS.length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <div className="prose dark:prose-invert max-w-none">

          <div className="text-center mb-12">
            <h1 className="brand-heading-2 !mb-4">About UtilToolkits</h1>
            <p className="brand-subheading">
              {toolCount}+ free, browser-based developer tools. No sign-up. No uploads. 100% private.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 not-prose">
            {[
              { value: `${toolCount}+`, label: 'Free Tools' },
              { value: '100%', label: 'Browser Processing' },
              { value: '0', label: 'Data Uploaded' },
              { value: 'No', label: 'Sign-up Required' },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-4 px-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <section>
            <h2 className="brand-heading-3">The &quot;Why&quot; Behind This Project</h2>
            <p>
              Hi, I&apos;m a developer just like you. I built UtilToolkits because I was tired of
              searching for simple tools — like a <Link href="/tools/json-formatter" className="text-blue-600 dark:text-blue-400 hover:underline">JSON formatter</Link> or
              an <Link href="/tools/image-compressor" className="text-blue-600 dark:text-blue-400 hover:underline">image compressor</Link> — only to land on sites buried in
              ads, requiring logins, or uploading my private data to a server just to process a few bytes.
            </p>
            <p>
              I realized that 99% of these tasks can be done instantly, right in the browser,
              without ever touching a server. So I started this as a hobby project to collect all
              those free coding tools and online utilities in one clean, fast, and private place.
            </p>
          </section>

          <section>
            <h2 className="brand-heading-3">Privacy-First, Browser-Based Utilities</h2>
            <p>
              Every tool on this site is a browser-based utility — your data never leaves your machine.
              Whether you&apos;re formatting JSON, compressing images, generating CSS, converting text,
              or calculating a hash, all processing happens locally using standard Web APIs.
            </p>
            <ul>
              <li><strong>Real-time Speed:</strong> No round-trips to a server. Results are instant.</li>
              <li><strong>100% Privacy:</strong> Your code, images, and text never reach our servers.</li>
              <li><strong>No Bloat:</strong> Just the tool, exactly when you need it.</li>
              <li><strong>Free forever:</strong> No free-tier limits, no paywalled features, no account required.</li>
            </ul>
          </section>

          <section>
            <h2 className="brand-heading-3">What You&apos;ll Find Here</h2>
            <p>UtilToolkits covers the full range of everyday developer and designer needs:</p>
            <ul>
              <li><strong>JSON tools</strong> — formatter, validator, JSON to TypeScript, JSON to CSV, YAML converter</li>
              <li><strong>Image converters &amp; optimizers</strong> — compress, resize, convert WebP/PNG/JPEG; watermark; Base64 encode</li>
              <li><strong>CSS generators</strong> — box shadow, gradient, border radius, glassmorphism, text shadow</li>
              <li><strong>Text processing tools</strong> — word counter, case converter, markdown previewer, slug generator, readability scorer</li>
              <li><strong>Coding utilities</strong> — regex tester, UUID generator, Base64 converter, hash generator, cron generator</li>
              <li><strong>AI workflow tools</strong> — token counter, prompt builder, context window calculator, AI text chunker</li>
            </ul>
            <p>
              Browse all {toolCount}+ tools on the <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:underline">Tools page</Link>,
              or explore curated <Link href="/collections" className="text-blue-600 dark:text-blue-400 hover:underline">collections by workflow</Link>.
            </p>
          </section>

          <section>
            <h2 className="brand-heading-3">The Roadmap: Powered by You</h2>
            <p>
              The goal is to keep adding free online developer tools to cover every possible need.
              If you need a specific converter, generator, or calculator that doesn&apos;t exist here yet, let me know —
              I build what you ask for.
            </p>
          </section>

          <section>
            <h2 className="brand-heading-3">Frequently Asked Questions</h2>
            <h3>Are these tools really free?</h3>
            <p>Yes, completely. No account, no credit card, no free-tier ceiling. Every tool is free without limit.</p>
            <h3>Do you store the data I process?</h3>
            <p>No. All processing happens in your browser. The text, images, code, and files you work with never leave your device.</p>
            <h3>Do the tools work offline?</h3>
            <p>Most tools work offline once the page has loaded, since all logic runs client-side.</p>
            <h3>Why is a particular tool missing?</h3>
            <p>
              Probably because no one has asked for it yet. Visit the{' '}
              <Link href="/request-tool" className="text-blue-600 dark:text-blue-400 hover:underline">Request a Tool</Link>{' '}
              page and I&apos;ll add it to the backlog.
            </p>
          </section>

          <section>
            <h2 className="brand-heading-3">Get in Touch</h2>
            <p>
              Whether you&apos;re debugging a JWT, optimizing assets, or just crunching numbers, I
              hope these tools save you a few minutes of frustration today.
            </p>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                💡 <strong>Missing a tool?</strong> Visit the{' '}
                <Link href="/request-tool" className="underline hover:text-blue-600 dark:hover:text-blue-300">
                  Request a Tool
                </Link>{' '}
                page. I read every suggestion!
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

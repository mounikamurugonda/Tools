import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About UtilToolkits - Our Mission & Vision | UtilToolkits',
  description:
    'Discover UtilToolkits: My passionate mission to build the ultimate one-stop hub for every browser-based tool on the internet, delivering fast, private, and free utilities that empower developers and users worldwide.',
  keywords:
    'about utilToolkits, developer tools mission, free online utilities, browser-based tools, privacy-focused tools, developer toolbox, online tool collection',
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
    title: 'About UtilToolkits - My Mission & Vision',
    description:
      'Discover UtilToolkits: My passionate mission to build the ultimate one-stop hub for every browser-based tool on the internet.',
    type: 'website',
    url: 'https://utiltoolkits.com/about',
    siteName: 'UtilToolkits',
    images: [
      {
        url: 'https://utiltoolkits.com/og-about.png',
        width: 1200,
        height: 630,
        alt: 'About UtilToolkits - My Mission',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About UtilToolkits - My Mission & Vision',
    description:
      'Discover UtilToolkits: My passionate mission to build the ultimate one-stop hub for every browser-based tool.',
    images: ['https://utiltoolkits.com/og-about.png'],
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
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <div className="prose dark:prose-invert max-w-none">
          <div className="text-center mb-12">
            <h1 className="brand-heading-2 !mb-4">About UtilToolkits</h1>
            <p className="brand-subheading">
              A developer&apos;s hobby project aimed at building the most practical collection of browser-based tools.
            </p>
          </div>

          <section>
            <h2 className="brand-heading-3">The &quot;Why&quot; Behind This Project</h2>
            <p>
              Hi, I&apos;m a developer just like you. I built UtilToolkits because I was tired of searching for simple tools—like a JSON formatter or an image compressor—only to land on sites buried in ads, requiring logins, or uploading my private data to a server just to process a few bytes.
            </p>
            <p>
              I realized that 99% of these tasks can be done instantly, right in the browser, without ever touching a server. So, I started this as a hobby project to collect all those utilities in one clean, fast, and private place.
            </p>
          </section>

          <section>
            <h2 className="brand-heading-3">Practical & Developer Focused</h2>
            <p>
              This isn&apos;t a startup chasing metrics. It&apos;s a toolbox. My goal is simple:
            </p>
            <ul>
              <li><strong>Real-time Speed:</strong> Everything runs locally. No API latency.</li>
              <li><strong>100% Privacy:</strong> Your data (images, code, text) never leaves your browser.</li>
              <li><strong>No Bloat:</strong> Just the tool, exactly when you need it.</li>
            </ul>
          </section>

          <section>
            <h2 className="brand-heading-3">The Roadmap: Powered by You</h2>
            <p>
              The goal isn&apos;t just 10 or 20 tools. I plan to add <strong>hundreds of tools</strong> to cover every possible developer need. But I can&apos;t guess them all.
            </p>
            <p>
              <strong>This project thrives on user requests.</strong> If you need a specific converter, generator, or calculator that doesn&apos;t exist here yet, let me know. I build what you ask for. This allows the toolkit to grow naturally based on real-world problems developers are facing right now.
            </p>
          </section>

          <section>
            <h2 className="brand-heading-3">Join Me</h2>
            <p>
              Whether you&apos;re debugging a JWT, optimizing assets, or just crunching numbers, I hope these tools save you a few minutes of frustration today.
            </p>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                💡 <strong>Missing a tool?</strong> Visit the{' '}
                <a
                  href="/request-tool"
                  className="underline hover:text-blue-600 dark:hover:text-blue-300"
                >
                  Request a Tool
                </a>{' '}
                page. I read every suggestion!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About UtilToolkits - Our Mission & Vision | UtilToolkits',
  description: 'Discover UtilToolkits: Our passionate mission to build the ultimate one-stop hub for every browser-based tool on the internet, delivering fast, private, and free utilities that empower developers and users worldwide.',
  keywords: 'about utilToolkits, developer tools mission, free online utilities, browser-based tools, privacy-focused tools, developer toolbox, online tool collection',
  authors: [{ name: 'UtilToolkits Team' }],
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
    title: 'About UtilToolkits - Our Mission & Vision',
    description: 'Discover UtilToolkits: Our passionate mission to build the ultimate one-stop hub for every browser-based tool on the internet.',
    type: 'website',
    url: 'https://utiltoolkits.com/about',
    siteName: 'UtilToolkits',
    images: [
      {
        url: 'https://utiltoolkits.com/og-about.png',
        width: 1200,
        height: 630,
        alt: 'About UtilToolkits - Our Mission',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About UtilToolkits - Our Mission & Vision',
    description: 'Discover UtilToolkits: Our passionate mission to build the ultimate one-stop hub for every browser-based tool.',
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
                        Welcome to UtilToolkits, the ambitious project born from a burning passion to revolutionize how we access and use online tools.
                    </p>
                </div>
        
                <section>
                    <h2 className="brand-heading-3">Our Passionate Mission</h2>
                    <p>
                    At UtilToolkits, we&apos;re driven by a simple yet powerful vision: to create the ultimate one-stop destination for every browser-based tool developers, designers, and productivity enthusiasts need. We believe that powerful utilities shouldn&apos;t require complex installations, expensive software, or compromise your privacy. That&apos;s why we&apos;ve built a comprehensive collection of <strong>50+ free online tools</strong> that work directly in your browser, processing everything locally for maximum speed and security.
                    </p>
                    <p>
                    Our mission extends beyond just providing tools - we&apos;re building a community where developers can find everything they need in one place. From JSON formatters and Base64 converters to image tools and productivity utilities, we&apos;re constantly expanding our collection based on real user needs and feedback. Every tool is designed with the modern developer in mind, featuring clean interfaces, instant results, and zero compromises on privacy.
                    </p>
                </section>
                
                <section>
                    <h2 className="brand-heading-3">What Sets Us Apart</h2>
                    <p>
                    What makes UtilToolkits different? We&apos;re not just another collection of basic utilities. We&apos;re a comprehensive platform built by developers, for developers, with a deep understanding of the real challenges you face daily. Our tools are designed with modern workflows in mind, featuring intuitive interfaces, instant processing, and professional-grade functionality.
                    </p>
                    <p>
                    Here&apos;s what makes our toolkit special:
                    </p>
                    <ul>
                        <li><strong>Text Mastery:</strong> Transform text with case converters, analyze readability scores, count words and characters, generate placeholder text, and reverse strings with precision.</li>
                        <li><strong>Coding Powerhouse:</strong> Format JSON, encode/decode Base64 and URLs, generate secure UUIDs and hashes, debug JWTs, and test regex patterns—all in your browser.</li>
                        <li><strong>Image Wizardry:</strong> Convert images to Base64, resize and optimize files, add watermarks, and extract thumbnails for seamless web integration.</li>
                        <li><strong>Creative Generators:</strong> Create strong passwords, generate QR codes, build color palettes, and craft modern CSS effects like glassmorphism.</li>
                        <li><strong>Smart Converters:</strong> Switch between units, currencies, colors, and file formats like CSV to JSON or XLSX with ease.</li>
                        <li><strong>Productivity Revolution:</strong> Harness Pomodoro timers, to-do lists, world clocks, and diff checkers to supercharge your daily workflow.</li>
                    </ul>
                    <p>
                    And this is just the beginning. We&apos;re continuously expanding our collection based on user feedback and emerging needs in the developer community.
                    </p>
                </section>
                
                <section>
                    <h2 className="brand-heading-3">Why Choose UtilToolkits?</h2>
                    <p className="mb-6">
                    In a world full of scattered tools and compromised privacy, UtilToolkits stands out as the trusted choice for developers who value efficiency, security, and reliability. Here&apos;s why thousands of developers choose us:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 not-prose">
                        <div className="brand-card p-6">
                            <h3 className="brand-heading-4 !mt-0">🔒 Uncompromised Privacy</h3>
                            <p className="brand-text-muted">Every tool processes data locally in your browser—no servers, no tracking, no data collection. Your sensitive information never leaves your device, giving you complete peace of mind.</p>
                        </div>
                        <div className="brand-card p-6">
                            <h3 className="brand-heading-4 !mt-0">⚡ Blazing Speed</h3>
                            <p className="brand-text-muted">No server delays, no network latency. Get instant results with client-side processing that keeps your workflow moving at maximum speed.</p>
                        </div>
                        <div className="brand-card p-6">
                            <h3 className="brand-heading-4 !mt-0">🌐 Offline-Ready</h3>
                            <p className="brand-text-muted">Once loaded, most tools work without internet connection, ensuring availability anytime, anywhere. Perfect for remote work and travel.</p>
                        </div>
                        <div className="brand-card p-6">
                            <h3 className="brand-heading-4 !mt-0">💯 Always Free</h3>
                            <p className="brand-text-muted">Driven by passion, not profit—access everything at no cost, forever. No hidden fees, no premium tiers, no credit card required.</p>
                        </div>
                        <div className="brand-card p-6">
                            <h3 className="brand-heading-4 !mt-0">🚀 No Registration</h3>
                            <p className="brand-text-muted">Start using tools immediately. No accounts, no sign-ups, no email verification. Just open and use—it&apos;s that simple.</p>
                        </div>
                        <div className="brand-card p-6">
                            <h3 className="brand-heading-4 !mt-0">🛠️ Professional Grade</h3>
                            <p className="brand-text-muted">Built by developers, for developers. Every tool is designed with real-world use cases in mind, featuring professional functionality and clean interfaces.</p>
                        </div>
                    </div>
                </section>
                
                <section>
                    <h2 className="brand-heading-3">Join Our Journey</h2>
                    <p>
                    We&apos;re building UtilToolkits for the developer community, and your feedback is what drives us forward. Have a tool idea? Found a bug? Want to suggest an improvement? We&apos;d love to hear from you. Our mission is to create the most comprehensive, user-friendly collection of developer tools, and we can&apos;t do it without your input.
                    </p>
                    <p>
                    Whether you&apos;re a seasoned developer, a student learning to code, or a designer looking for efficient tools, UtilToolkits is here to support your journey. Together, let&apos;s build the ultimate toolkit that empowers everyone to work smarter, faster, and more securely.
                    </p>
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-blue-800 dark:text-blue-200 font-medium">
                            💡 <strong>Got ideas?</strong> Visit our <a href="/contact" className="underline hover:text-blue-600 dark:hover:text-blue-300">Contact page</a> to share your suggestions, report issues, or just say hello!
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
  );
};
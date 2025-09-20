import React from 'react';
import PageContainer from '@/components/PageContainer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Discover UtilToolkits: Our passionate mission to build the ultimate one-stop hub for every browser-based tool on the internet, delivering fast, private, and free utilities that empower developers and users worldwide.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <PageContainer title="About UtilToolkits">
      <section>
        <p>
          Welcome to UtilToolkits, the ambitious project born from a burning passion to revolutionize how we access and use online tools. We&apos;re not just another toolbox—we&apos;re on a relentless mission to curate and create the most comprehensive collection of browser-based utilities available anywhere on the internet. Imagine having every essential tool, from text manipulators to advanced converters, all in one spot, running seamlessly in your browser without compromising your privacy or speed.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Our Passionate Mission</h2>
        <p>
          At UtilToolkits, our drive comes from a deep-seated determination to solve a universal frustration: the endless search across scattered websites for the right tool. We envision a world where developers, creators, and everyday users can find every utility they need in a single, unified platform. That&apos;s why we&apos;re committed to scouring the internet, innovating new features, and integrating the best ideas into our suite—all while ensuring everything operates client-side for ultimate privacy and lightning-fast performance. We&apos;re building the ultimate one-stop shop for tools, and we won&apos;t stop until we&apos;ve covered every category imaginable, from coding essentials to productivity boosters and beyond.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">What Sets Us Apart</h2>
        <p>
          Unlike generic tool sites, UtilToolkits is fueled by an unyielding passion for excellence and completeness. We&apos;re constantly expanding our library, drawing inspiration from across the web to bring you innovative, user-requested features. Our tools are designed with real-world needs in mind, crafted to save time, enhance creativity, and boost efficiency. Here&apos;s a glimpse of our growing arsenal:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 text-gray-600 dark:text-gray-400">
          <li><strong>Text Mastery:</strong> Effortlessly convert cases, count words and characters, generate placeholder text, and reverse strings with precision.</li>
          <li><strong>Coding Powerhouse:</strong> Format JSON, encode/decode Base64 and URLs, generate secure UUIDs and hashes, debug JWTs, and test regex patterns—all in your browser.</li>
          <li><strong>Image Wizardry:</strong> Transform images to Base64 data URLs and back, perfect for seamless web integration.</li>
          <li><strong>Creative Generators:</strong> Craft strong passwords, produce QR codes, build color palettes, and even generate memes to spark joy in your workflow.</li>
          <li><strong>Smart Converters:</strong> Switch between units, currencies, colors, and file formats like CSV to JSON or XLSX with ease.</li>
          <li><strong>Productivity Revolution:</strong> Harness Pomodoro timers, to-do lists, world clocks, and diff checkers to supercharge your daily grind.</li>
        </ul>
        <p>
          And this is just the beginning. Our goal is to encompass every tool out there—mathematical calculators, scientific simulators, multimedia editors, and more—making UtilToolkits the definitive destination for all your utility needs.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Choose UtilToolkits?</h2>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Uncompromised Privacy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Every tool processes data locally in your browser—no servers, no tracking, just pure privacy.</p>
            </div>
             <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Blazing Speed</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Instant results without waiting for server responses, keeping your momentum unbroken.</p>
            </div>
             <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Offline-Ready</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Once loaded, many tools work without internet, ensuring availability anytime, anywhere.</p>
            </div>
             <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Free Forever</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Driven by passion, not profit—access everything at no cost, supported by our community.</p>
            </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">Join Our Journey</h2>
        <p>
          We&apos;re obsessed with making UtilToolkits the go-to resource for tools, and your input fuels our fire. Have a tool idea? Spot a gap in our collection? Reach out via our Contact page—we&apos;re determined to incorporate the best suggestions and keep evolving. Together, let&apos;s build the ultimate toolkit that empowers everyone to achieve more with less hassle.
        </p>
      </section>
    </PageContainer>
  );
};
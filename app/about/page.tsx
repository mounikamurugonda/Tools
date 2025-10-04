import React from 'react';
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
    <div className="brand-container-narrow brand-section prose dark:prose-invert max-w-none">
        <div className="text-center mb-12">
            <h1 className="brand-heading-2 !mb-4">About UtilToolkits</h1>
            <p className="brand-subheading">
                Welcome to UtilToolkits, the ambitious project born from a burning passion to revolutionize how we access and use online tools.
            </p>
        </div>

        <section>
            <h2 className="brand-heading-3">Our Passionate Mission</h2>
            <p>
            At UtilToolkits, our drive comes from a deep-seated determination to solve a universal frustration: the endless search across scattered websites for the right tool. We envision a world where developers, creators, and everyday users can find every utility they need in a single, unified platform. That&apos;s why we&apos;re committed to scouring the internet, innovating new features, and integrating the best ideas into our suite—all while ensuring everything operates client-side for ultimate privacy and lightning-fast performance. We&apos;re building the ultimate one-stop shop for tools, and we won&apos;t stop until we&apos;ve covered every category imaginable, from coding essentials to productivity boosters and beyond.
            </p>
        </section>
        
        <section>
            <h2 className="brand-heading-3">What Sets Us Apart</h2>
            <p>
            Unlike generic tool sites, UtilToolkits is fueled by an unyielding passion for excellence and completeness. We&apos;re constantly expanding our library, drawing inspiration from across the web to bring you innovative, user-requested features. Our tools are designed with real-world needs in mind, crafted to save time, enhance creativity, and boost efficiency. Here&apos;s a glimpse of our growing arsenal:
            </p>
            <ul>
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
            <h2 className="brand-heading-3">Why Choose UtilToolkits?</h2>
            <div className="grid md:grid-cols-2 gap-6 not-prose">
                <div className="brand-card p-6">
                    <h3 className="brand-heading-4 !mt-0">Uncompromised Privacy</h3>
                    <p className="brand-text-muted">Every tool processes data locally in your browser—no servers, no tracking, just pure privacy.</p>
                </div>
                <div className="brand-card p-6">
                    <h3 className="brand-heading-4 !mt-0">Blazing Speed</h3>
                    <p className="brand-text-muted">Instant results without waiting for server responses, keeping your momentum unbroken.</p>
                </div>
                <div className="brand-card p-6">
                    <h3 className="brand-heading-4 !mt-0">Offline-Ready</h3>
                    <p className="brand-text-muted">Once loaded, many tools work without internet, ensuring availability anytime, anywhere.</p>
                </div>
                <div className="brand-card p-6">
                    <h3 className="brand-heading-4 !mt-0">Free Forever</h3>
                    <p className="brand-text-muted">Driven by passion, not profit—access everything at no cost, supported by our community.</p>
                </div>
            </div>
        </section>
        
        <section>
            <h2 className="brand-heading-3">Join Our Journey</h2>
            <p>
            We&apos;re obsessed with making UtilToolkits the go-to resource for tools, and your input fuels our fire. Have a tool idea? Spot a gap in our collection? Reach out via our Contact page—we&apos;re determined to incorporate the best suggestions and keep evolving. Together, let&apos;s build the ultimate toolkit that empowers everyone to achieve more with less hassle.
            </p>
        </section>
    </div>
  );
};
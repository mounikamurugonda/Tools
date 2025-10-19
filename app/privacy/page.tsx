import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - UtilToolkits Data Protection | UtilToolkits',
  description: 'Read the UtilToolkits privacy policy to understand how we handle data. Our tools are client-side, ensuring your information remains private and secure. No data collection, no tracking.',
  keywords: 'privacy policy, data protection, client-side tools, privacy-focused, no data collection, secure tools, browser-based privacy, utilToolkits privacy',
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
    title: 'Privacy Policy - UtilToolkits Data Protection',
    description: 'Read the UtilToolkits privacy policy to understand how we handle data. Our tools are client-side, ensuring your information remains private and secure.',
    type: 'website',
    url: 'https://utiltoolkits.com/privacy',
    siteName: 'UtilToolkits',
    images: [
      {
        url: 'https://utiltoolkits.com/og-privacy.png',
        width: 1200,
        height: 630,
        alt: 'UtilToolkits Privacy Policy',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - UtilToolkits Data Protection',
    description: 'Read the UtilToolkits privacy policy to understand how we handle data. Our tools are client-side, ensuring your information remains private and secure.',
    images: ['https://utiltoolkits.com/og-privacy.png'],
    creator: '@utiltoolkits',
  },
  alternates: {
    canonical: '/privacy',
  },
  other: {
    'theme-color': '#3b82f6',
    'msapplication-TileColor': '#3b82f6',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="brand-container-narrow brand-section prose dark:prose-invert max-w-none">
        <div className="text-center mb-12">
            <h1 className="brand-heading-2 !mb-2">Privacy Policy</h1>
            <p className="brand-text-muted"><em>Last Updated: {new Date().toLocaleDateString()}</em></p>
        </div>
      
      <p>
        Your privacy is important to us. It is UtilToolkits&apos; policy to respect your privacy regarding any information we may collect from you across our website.
      </p>

      <section>
        <h2 className="brand-heading-3">1. Information We Collect</h2>
        <p>
          Our website is designed to be a client-side utility toolbox. This means that all the data you input into our tools (e.g., text for conversion, images for encoding) is processed directly in your browser. <strong>We do not send, store, or log any of this data on our servers.</strong>
        </p>
        <p>
          The only data we collect is through standard web logs and analytics, which may include your IP address, browser type, operating system, and pages visited. This information is used for statistical purposes to improve our service and is not linked to any personal information.
        </p>
      </section>
      
      <section>
        <h2 className="brand-heading-3">2. Cookies</h2>
        <p>
          We use cookies to improve your experience on our site. Cookies are small data files that are stored on your computer.
        </p>
        <ul>
          <li><strong>Functionality Cookies:</strong> We may use cookies to remember your preferences, such as your preferred theme (light/dark mode).</li>
          <li><strong>Third-Party Cookies:</strong> We may use third-party services like Google AdSense, which use cookies to serve personalized ads based on your prior visits to our website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
        </ul>
        <p>
          You can choose to disable cookies through your browser settings. You may also opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google&apos;s Ads Settings</a>.
        </p>
      </section>

      <section>
        <h2 className="brand-heading-3">3. Third-Party Services</h2>
        <p>
          This website may contain links to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
        </p>
        <p>
          As mentioned, we use Google AdSense to display advertisements. AdSense is a third-party vendor that uses cookies to serve ads. For more information on how Google collects and uses data, please see <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google&apos;s advertising policies</a>.
        </p>
      </section>

      <section>
        <h2 className="brand-heading-3">4. Your Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>
      </section>
      
      <section>
        <h2 className="brand-heading-3">5. Changes to Our Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section>
        <h2 className="brand-heading-3">6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us via the information provided on our <Link href="/contact">Contact page</Link>.
        </p>
      </section>
    </div>
  );
};

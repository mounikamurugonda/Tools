import React from 'react';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact UtilToolkits - Get in Touch | UtilToolkits',
  description:
    'Get in touch with UtilToolkits. Send your questions, feedback, or suggestions for new developer tools. I would love to hear from you and help improve your experience.',
  keywords:
    'contact utilToolkits, developer tools feedback, tool suggestions, support, help, questions, feedback form, developer tools contact',
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
    title: 'Contact UtilToolkits - Get in Touch',
    description:
      'Get in touch with UtilToolkits. Send your questions, feedback, or suggestions for new developer tools.',
    type: 'website',
    url: 'https://utiltoolkits.com/contact',
    siteName: 'UtilToolkits',
    images: [
      {
        url: 'https://utiltoolkits.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact UtilToolkits',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact UtilToolkits - Get in Touch',
    description:
      'Get in touch with UtilToolkits. Send your questions, feedback, or suggestions for new developer tools.',
    images: ['https://utiltoolkits.com/og-image.png'],
    creator: '@utiltoolkits',
  },
  alternates: {
    canonical: '/contact',
  },
  other: {
    'theme-color': '#3b82f6',
    'msapplication-TileColor': '#3b82f6',
  },
};

export default function ContactPage() {
  return (
    <div className="brand-container-narrow brand-section">
      <div className="text-center">
        <h1 className="brand-heading-2">Contact Me</h1>
        <p className="mt-4 max-w-2xl mx-auto brand-subheading">
          I&apos;d love to hear from you! Whether you have a question, a suggestion for a new tool,
          or feedback on how to improve, please fill out the form below to send a message.
        </p>
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        <ContactForm />
      </div>

      <div className="mt-12 text-center brand-text-muted">
        <p>Thank you for using UtilToolkits!</p>
      </div>
    </div>
  );
}

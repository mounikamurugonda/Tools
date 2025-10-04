import React from 'react';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the UtilToolkits team. Send us your questions, feedback, or suggestions for new developer tools. We would love to hear from you.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="brand-container-narrow brand-section">
        <div className="text-center">
            <h1 className="brand-heading-2">Contact Us</h1>
            <p className="mt-4 max-w-2xl mx-auto brand-subheading">
                We&apos;d love to hear from you! Whether you have a question, a suggestion for a new tool, or feedback on how we can improve, please fill out the form below to send us a message.
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
};

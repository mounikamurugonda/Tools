import React from 'react';
import PageContainer from '@/components/PageContainer';
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
    <PageContainer title="Contact Us">
      <p>
        We&apos;d love to hear from you! Whether you have a question, a suggestion for a new tool, or feedback on how we can improve, please fill out the form below to send us a message.
      </p>
      
      <div className="mt-8 max-w-2xl mx-auto">
        <ContactForm />
      </div>
      
      <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p>Thank you for using UtilToolkits!</p>
      </div>
    </PageContainer>
  );
};

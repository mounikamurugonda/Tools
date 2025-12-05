'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    const formData = new FormData(event.currentTarget);

    // The access key determines the email recipient configured in your Web3Forms account.
    formData.append('access_key', process.env.NEXT_PUBLIC_Contact_Form!);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmissionStatus('success');
        setSubmissionMessage(
          'Thank you! Your message has been sent successfully.',
        );
        (event.target as HTMLFormElement).reset(); // Reset form fields
      } else {
        setSubmissionStatus('error');
        setSubmissionMessage(
          data.message || 'Oops! Something went wrong. Please try again.',
        );
      }
    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionMessage(
        'An error occurred while sending your message. Please check your connection.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="brand-card p-6 sm:p-8 space-y-6">
      <input
        type="hidden"
        name="subject"
        value="New Contact Form Submission from UtilToolkits"
      />
      <input type="hidden" name="from_name" value="UtilToolkits Contact" />

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="brand-input"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="brand-input"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="brand-input"
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full brand-button-primary py-3 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {submissionStatus !== 'idle' && (
        <div
          className={`p-3 rounded-md text-sm ${submissionStatus === 'success' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'}`}
        >
          {submissionMessage}
        </div>
      )}
    </form>
  );
}

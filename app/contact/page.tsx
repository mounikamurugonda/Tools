
'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    const formData = new FormData(event.currentTarget);
    
    // The access key determines the email recipient configured in your Web3Forms account.
    formData.append("access_key", "a726abc4-2beb-4b80-87d7-c0d3ffd37eba");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmissionStatus('success');
        setSubmissionMessage('Thank you! Your message has been sent successfully.');
        (event.target as HTMLFormElement).reset(); // Reset form fields
      } else {
        setSubmissionStatus('error');
        setSubmissionMessage(data.message || 'Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionMessage('An error occurred while sending your message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer title="Contact Us">
      <p>
        We'd love to hear from you! Whether you have a question, a suggestion for a new tool, or feedback on how we can improve, please fill out the form below to send us a message.
      </p>
      
      <div className="mt-8 max-w-2xl mx-auto">
        <form 
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-gray-800/50 p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <input type="hidden" name="subject" value="New Contact Form Submission from UtilToolkits" />
          <input type="hidden" name="from_name" value="UtilToolkits Contact" />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows={5} 
              required 
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
            ></textarea>
          </div>

          <div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {submissionStatus !== 'idle' && (
            <div className={`p-3 rounded-md text-sm ${submissionStatus === 'success' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'}`}>
              {submissionMessage}
            </div>
          )}
        </form>
      </div>
      
      <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p>Thank you for using UtilToolkits!</p>
      </div>
    </PageContainer>
  );
};

'use client';

import React, { useState } from 'react';

export default function RequestToolPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus('idle');

        const formData = new FormData(event.currentTarget);

        // Add Web3Forms access key
        formData.append('access_key', process.env.NEXT_PUBLIC_REQUEST_A_TOOL!);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setSubmissionStatus('success');
                setSubmissionMessage('Thank you! Your tool request has been submitted successfully.');
                (event.target as HTMLFormElement).reset();
            } else {
                setSubmissionStatus('error');
                setSubmissionMessage(data.message || 'Oops! Something went wrong. Please try again.');
            }
        } catch (error) {
            setSubmissionStatus('error');
            setSubmissionMessage('An error occurred while sending your request. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Request a Tool
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Can&apos;t find the tool you need? Let us know and we&apos;ll consider adding it!
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Hidden fields for Web3Forms */}
                        <input type="hidden" name="from_name" value="UtilToolkits Tool Request" />

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="toolName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tool Name
                            </label>
                            <input
                                type="text"
                                id="toolName"
                                name="subject"
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="e.g., SVG to PNG Converter"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="message"
                                required
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                                placeholder="Describe what the tool should do..."
                            ></textarea>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>

                        {submissionStatus !== 'idle' && (
                            <div className={`p-3 rounded-md text-sm ${submissionStatus === 'success' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'}`}>
                                {submissionMessage}
                            </div>
                        )}
                    </form>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>We review all tool requests and prioritize based on community demand.</p>
                </div>
            </div>
        </div>
    );
}

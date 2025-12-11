'use client';

import React, { useState } from 'react';

export default function RequestToolPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        toolName: '',
        description: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: process.env.REQUEST_A_TOOL,
                    subject: `New Tool Request: ${formData.toolName}`,
                    from_name: formData.name,
                    email: formData.email,
                    message: `Tool Request: ${formData.toolName}\n\nDescription:\n${formData.description}`,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setMessage('Thank you! Your tool request has been submitted successfully.');
                setFormData({ name: '', email: '', toolName: '', description: '' });
            } else {
                setStatus('error');
                setMessage('Failed to submit request. Please try again.');
            }
        } catch (error) {
            console.error('Web3Forms error:', error);
            setStatus('error');
            setMessage('Failed to submit request. Please try again later.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
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
                                value={formData.email}
                                onChange={handleChange}
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
                                name="toolName"
                                value={formData.toolName}
                                onChange={handleChange}
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
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                                placeholder="Describe what the tool should do..."
                            />
                        </div>

                        {status === 'success' && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                <p className="text-green-800 dark:text-green-300 text-sm">{message}</p>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <p className="text-red-800 dark:text-red-300 text-sm">{message}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>We review all tool requests and prioritize based on community demand.</p>
                </div>
            </div>
        </div>
    );
}

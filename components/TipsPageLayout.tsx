import React from 'react';

interface TipsPageLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const TipsPageLayout: React.FC<TipsPageLayoutProps> = ({ title, description, children }) => {
    return (
        <div className="animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="brand-kicker mb-2">Tips & Tricks</div>
                        <h1 className="brand-title">{title}</h1>
                    </div>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">{description}</p>
            </div>

            <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                {children}
            </div>
        </div>
    );
};

export default TipsPageLayout;

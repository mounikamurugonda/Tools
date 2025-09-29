import React from 'react';
import ToolDescription from "./ToolDescription";

interface ToolPageLayoutProps {
    title: string;
    description: string;
    toolId: string;
    children: React.ReactNode;
}

const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({ title, description, toolId, children }) => {
    return (
        <div className="max-w-4xl mx-auto p-2 md:p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
            </div>

            <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                {children}
            </div>
            
            {/* The ToolDescription will be rendered as part of the children from the ToolComponent */}
        </div>
    );
};

export default ToolPageLayout;

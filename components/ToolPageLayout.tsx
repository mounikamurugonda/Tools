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
        <div className="animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-12 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="brand-kicker mb-2">Tool</div>
                      <h1 className="brand-title">{title}</h1>
                    </div>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">{description}</p>
            </div>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
                {children}
            </div>
            
            {/* The ToolDescription will be rendered as part of the children from the ToolComponent */}
        </div>
    );
};

export default ToolPageLayout;

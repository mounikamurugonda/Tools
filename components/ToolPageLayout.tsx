
import React from 'react';
import Sidebar from './Sidebar';
import { TOOLS } from '../constants';
import type { Tool } from '../types';

interface ToolPageLayoutProps {
    selectedToolId: string;
    onSelectTool: (id: string) => void;
}

const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({ selectedToolId, onSelectTool }) => {
    const selectedTool = TOOLS.find((t: Tool) => t.id === selectedToolId);

    const renderTool = () => {
        if (!selectedTool) {
            return <p className="text-center text-red-500 p-8">Tool not found!</p>;
        }
        const ToolComponent = selectedTool.component;
        return <ToolComponent />;
    };

    return (
        <div className="flex flex-col md:flex-row flex-grow">
            <Sidebar 
                activeToolId={selectedToolId}
                onSelectTool={onSelectTool}
            />
            <div className="flex-grow bg-gray-50 dark:bg-gray-900 overflow-y-auto">
                {renderTool()}
            </div>
        </div>
    );
};

export default ToolPageLayout;


import React from 'react';
import type { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onSelect: (id: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(tool.id)}
      className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center border border-gray-700 hover:border-blue-500 hover:bg-gray-700 transition-all duration-200 cursor-pointer"
    >
      {tool.icon}
      <h3 className="font-semibold text-lg text-white mb-2">{tool.name}</h3>
      <p className="text-gray-400 text-sm">{tool.description}</p>
    </div>
  );
};

export default ToolCard;

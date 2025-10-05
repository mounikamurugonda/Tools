import React from 'react';
import {
    CodeCategoryIcon,
    ContentCategoryIcon,
    CssCategoryIcon,
    FunCategoryIcon,
    ImageCategoryIcon,
    MiscCategoryIcon,
    ProductivityCategoryIcon,
    SecurityCategoryIcon,
    TextCategoryIcon
} from './icons';

interface TipCardProps {
    tip: {
        category: string;
        content: string;
    };
}

const categoryIcons: { [key: string]: React.ReactElement } = {
    'Productivity': <ProductivityCategoryIcon />,
    'Coding': <CodeCategoryIcon />,
    'Design': <CssCategoryIcon />,
    'Content': <ContentCategoryIcon />,
    'Security': <SecurityCategoryIcon />,
    'Fun': <FunCategoryIcon />,
    'Miscellaneous': <MiscCategoryIcon />,
    'Text': <TextCategoryIcon />,
    'Image': <ImageCategoryIcon />,
};

const TipCard: React.FC<TipCardProps> = ({ tip }) => {
    const icon = categoryIcons[tip.category] || <MiscCategoryIcon />;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 h-full">
            {React.cloneElement(icon, { className: "w-8 h-8 text-blue-400 mb-4" })}
            <span className="brand-badge mb-4">{tip.category}</span>
            <p className="text-gray-600 dark:text-gray-400 text-sm flex-1">{tip.content}</p>
        </div>
    );
};

export default TipCard;

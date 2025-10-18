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
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 h-full">
            <div className="flex items-start gap-4 text-left">
                <div className="flex-shrink-0 pt-0.5">
                    {React.cloneElement(icon, { className: "w-8 h-8 text-blue-500" })}
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">{tip.category}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm  ">{tip.content}</p>
                    {/* <div className="mt-4">
                        <span className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">Read more</span>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default TipCard;

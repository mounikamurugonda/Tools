import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: boolean;
}

const Select: React.FC<SelectProps> = ({ className = '', error, ...props }) => {
    const baseStyles =
        'w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white appearance-none cursor-pointer';
    const borderStyles = error
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-200 dark:border-gray-700';

    return (
        <div className="relative">
            <select
                className={`${baseStyles} ${borderStyles} ${className}`}
                {...props}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Select;

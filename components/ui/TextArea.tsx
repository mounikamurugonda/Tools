import React from 'react';

interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
    className = '',
    error,
    ...props
}) => {
    const baseStyles =
        'w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none';
    const borderStyles = error
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-200 dark:border-gray-700';

    return (
        <textarea
            className={`${baseStyles} ${borderStyles} ${className}`}
            {...props}
        />
    );
};

export default TextArea;

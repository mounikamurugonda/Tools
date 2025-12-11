import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Input: React.FC<InputProps> = ({ className = '', error, ...props }) => {
    const baseStyles =
        'w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500';
    const borderStyles = error
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-200 dark:border-gray-700';

    return (
        <input className={`${baseStyles} ${borderStyles} ${className}`} {...props} />
    );
};

export default Input;

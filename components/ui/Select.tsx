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
        className={`pr-6 ${baseStyles} ${borderStyles} ${className}`}
        style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
        {...props}
      />
    </div>
  );
};

export default Select;

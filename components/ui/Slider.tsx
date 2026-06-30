import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valueDisplay?: string | number;
}

const Slider: React.FC<SliderProps> = ({ className = '', label, valueDisplay, ...props }) => {
  return (
    <div className={className}>
      {(label || valueDisplay) && (
        <div className="flex justify-between mb-2">
          {label && (
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
          )}
          {valueDisplay && (
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {valueDisplay}
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
        {...props}
      />
    </div>
  );
};

export default Slider;

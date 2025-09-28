'use client'

import React from 'react';
import { LogoIcon } from './icons';

interface LogoProps {
    size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 24 }) => {
    const sizeClass = size === 24 ? "w-6 h-6" : size === 32 ? "w-8 h-8" : size === 48 ? "w-12 h-12" : "w-6 h-6";
    
    return (
        <div className="flex items-center gap-2">
            <LogoIcon className={`text-blue-500 ${sizeClass}`} />
            <span className="font-bold text-xl text-gray-800 dark:text-white hidden sm:inline">
                UtilToolkits
            </span>
        </div>
    );
};

export default Logo;

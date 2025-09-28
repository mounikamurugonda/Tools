'use client'

import React from 'react';
import { LogoIcon } from './icons';

interface LogoProps {
    size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 24 }) => {
    return (
        <div className="flex items-center gap-2">
            <LogoIcon className="text-blue-500" style={{ height: size, width: size }} />
            <span className="font-bold text-xl text-gray-800 dark:text-white hidden sm:inline">
                UtilToolkits
            </span>
        </div>
    );
};

export default Logo;

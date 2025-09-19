import React from 'react';
import { LogoIcon } from './icons';

const Logo: React.FC = () => (
  <div className="flex items-center gap-2" title="UtilToolkits Homepage">
    <LogoIcon className="w-7 h-7 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400" />
    <h1 className="text-2xl text-gray-900 dark:text-white tracking-tighter">
      <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
        Util
      </span>
      <span className="font-medium">
        Toolkits
      </span>
    </h1>
  </div>
);

export default Logo;

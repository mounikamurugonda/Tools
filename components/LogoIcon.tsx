import React from 'react';

const LogoIcon = () => {
  return (
    <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
      <svg
        className="w-5 h-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Matrix of Dots (Inactive) */}
        <path
          d="M9 3h0 M15 3h0 M9 9h0 M15 9h0 M9 15h0 M15 15h0 M3 21h0 M21 21h0"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="opacity-40"
        />
        {/* Active Dots forming 'U' */}
        <path
          d="M3 3h0 M21 3h0 M3 9h0 M21 9h0 M3 15h0 M21 15h0 M9 21h0 M15 21h0"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="opacity-100"
        />
      </svg>
      <div className="absolute inset-0 rounded-xl ring-1 ring-white/20"></div>
    </div>
  );
};

export default LogoIcon;

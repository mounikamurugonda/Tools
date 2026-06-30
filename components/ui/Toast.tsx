import React, { useEffect } from 'react';
import { Check, AlertCircle, X, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type?: ToastType;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
    message,
    type = 'info',
    isVisible,
    onClose,
    duration = 3000
}) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const bgColors = {
        success: 'bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400',
        error: 'bg-white dark:bg-gray-800 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400',
        info: 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400',
    };

    const iconColors = {
        success: 'text-green-500',
        error: 'text-red-500',
        info: 'text-blue-500'
    }

    const icons = {
        success: <Check size={18} className={iconColors.success} />,
        error: <AlertCircle size={18} className={iconColors.error} />,
        info: <Info size={18} className={iconColors.info} />,
    };

    return (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-4 duration-300 ${bgColors[type]}`}>
            <span className="shrink-0">{icons[type]}</span>
            <p className="text-sm font-semibold">{message}</p>
            <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <X size={14} />
            </button>
        </div>
    );
};

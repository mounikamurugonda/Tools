import React, { createContext, useContext, ReactNode } from 'react';

interface TabsContextType {
    value: string;
    onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function Tabs({
    value,
    onValueChange,
    children,
    className = ''
}: {
    value: string;
    onValueChange: (value: string) => void;
    children: ReactNode;
    className?: string;
}) {
    return (
        <TabsContext.Provider value={{ value, onValueChange }}>
            <div className={`flex flex-col ${className}`}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

export function TabsList({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className={`flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl ${className}`}>
            {children}
        </div>
    );
}

export function TabsTrigger({
    value,
    children,
    className = ''
}: {
    value: string;
    children: ReactNode;
    className?: string;
}) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsTrigger must be used within Tabs');

    const isActive = context.value === value;

    return (
        <button
            onClick={() => context.onValueChange(value)}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
        ${isActive
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'} 
        ${className}`}
        >
            {children}
        </button>
    );
}

export function TabsContent({
    value,
    children,
    className = ''
}: {
    value: string;
    children: ReactNode;
    className?: string;
}) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsContent must be used within Tabs');

    if (context.value !== value) return null;

    return (
        <div className={`mt-4 ${className}`}>
            {children}
        </div>
    );
}

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import ConditionalFooter from '@/components/ConditionalFooter';
import Schema from '@/components/Schema';
import { getNavigationSchema } from '@/lib/schema';

export default function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isCodeCast = pathname ? [
        '/product/code-cast/animate',
        '/product/code-cast/type',
        '/product/code-cast/image',
        '/product/code-cast/library',
        '/product/code-cast/saved'
    ].some(path => pathname.startsWith(path)) : false;

    return (
        <div className={`min-h-screen w-full flex flex-col transition-colors duration-300 ${isCodeCast ? 'pt-0' : 'pt-20'}`}>
            <Schema schema={getNavigationSchema()} />

            {/* Conditionally render Header: Hidden on CodeCast routes, Visible otherwise */}
            {!isCodeCast && <Header />}

            <main className="flex-grow flex flex-col">{children}</main>

            <ConditionalFooter />
        </div>
    );
}

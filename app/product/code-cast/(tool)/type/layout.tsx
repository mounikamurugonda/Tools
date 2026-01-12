import React from 'react';
import Schema from '../../../../../components/Schema';
import { getCodeCastToolSchema, getBreadcrumbSchema } from '../../../../../lib/schema';

export default function TypeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Schema schema={getCodeCastToolSchema('type')} />
            <Schema
                schema={getBreadcrumbSchema([
                    { name: 'Home', url: 'https://utiltoolkits.com' },
                    { name: 'CodeCast', url: 'https://utiltoolkits.com/product/code-cast' },
                    { name: 'Type', url: 'https://utiltoolkits.com/product/code-cast/type' },
                ])}
            />
            {children}
        </>
    );
}

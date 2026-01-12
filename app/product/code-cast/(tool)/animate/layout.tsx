import React from 'react';
import Schema from '../../../../../components/Schema';
import { getCodeCastToolSchema, getBreadcrumbSchema } from '../../../../../lib/schema';

export default function AnimateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Schema schema={getCodeCastToolSchema('animate')} />
            <Schema
                schema={getBreadcrumbSchema([
                    { name: 'Home', url: 'https://utiltoolkits.com' },
                    { name: 'CodeCast', url: 'https://utiltoolkits.com/product/code-cast' },
                    { name: 'Animate', url: 'https://utiltoolkits.com/product/code-cast/animate' },
                ])}
            />
            {children}
        </>
    );
}

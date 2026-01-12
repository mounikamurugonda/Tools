import React from 'react';
import Schema from '../../../../../components/Schema';
import { getCodeCastToolSchema, getBreadcrumbSchema } from '../../../../../lib/schema';

export default function ImageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Schema schema={getCodeCastToolSchema('image')} />
            <Schema
                schema={getBreadcrumbSchema([
                    { name: 'Home', url: 'https://utiltoolkits.com' },
                    { name: 'CodeCast', url: 'https://utiltoolkits.com/product/code-cast' },
                    { name: 'Image', url: 'https://utiltoolkits.com/product/code-cast/image' },
                ])}
            />
            {children}
        </>
    );
}

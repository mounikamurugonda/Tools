import Script from 'next/script';
import React from 'react';

export default function GoogleAnalytics() {
    return (
        <>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-1FR50BJ792"
                strategy="lazyOnload"
            />
            <Script
                id="google-analytics"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1FR50BJ792');
          `,
                }}
            />
        </>
    );
}

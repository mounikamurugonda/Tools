import Script from 'next/script';
import React from 'react';

export default function GoogleAdSense() {
    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7845670227485203"
            crossOrigin="anonymous"
            strategy="lazyOnload"
        />
    );
}

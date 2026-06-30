/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
        ],
    },
    async redirects() {
        return [
            // Consolidated into /tools/word-counter (gained byte-size / SMS / Twitter / meta-desc gauges).
            { source: '/tools/character-counter', destination: '/tools/word-counter', permanent: true },
            // Consolidated into bi-directional /tools/json-csv-converter (handles both directions).
            { source: '/tools/csv-to-json', destination: '/tools/json-csv-converter', permanent: true },
            { source: '/tools/json-to-csv', destination: '/tools/json-csv-converter', permanent: true },
            // Consolidated into bi-directional /tools/image-to-base64 (now handles encode + decode).
            { source: '/tools/base64-to-image', destination: '/tools/image-to-base64', permanent: true },

            // --- Clear GSC 404s (old URLs Google crawled Dec 2025–Jan 2026) ---
            // Renamed tool id.
            { source: '/tools/random-number', destination: '/tools/random-number-generator', permanent: true },
            // Old/invalid category slugs that never matched CATEGORY_URL_MAP.
            { source: '/tools/category/miscellaneous-tools', destination: '/tools/category/other', permanent: true },
            { source: '/tools/category/converter', destination: '/tools', permanent: true },
            { source: '/tools/category/generator', destination: '/tools', permanent: true },
            { source: '/tools/category/analyzer', destination: '/tools', permanent: true },
            // The /tips feature was removed; its content now lives under /blogs.
            { source: '/tips', destination: '/blogs', permanent: true },
            { source: '/tips/:path*', destination: '/blogs', permanent: true },
        ];
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'require-corp',
                    },
                    {
           
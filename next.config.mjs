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
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;

import { Metadata } from 'next';
import TruthScanClientWrapper from './TruthScanClientWrapper';
import Schema from '../../../components/Schema';
import { getTruthScanProductSchema, getBreadcrumbSchema } from '../../../lib/schema';

export const metadata: Metadata = {
    title: 'AI Content Detector',
    description:
        'The most advanced free AI content detector. Know instantly if text was written by AI or a human. Uses dual-layer analysis — statistical linguistics + Sarvam-M AI — for accurate, explainable results.',
    keywords: [
        'ai content detector',
        'ai text detection',
        'chatgpt detector',
        'detect ai writing',
        'ai essay detector',
        'human vs ai text',
        'ai checker free',
        'ai content checker',
        'detect ai generated text',
        'plagiarism ai detector',
    ],
    openGraph: {
        title: 'AI Content Detector — Know What\'s Human. Know What\'s Machine.',
        description:
            'Free AI content detection with dual-layer analysis. Get Human Score, AI Score, sentence-level heatmap and signal breakdown instantly.',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'AI Content Detector',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Content Detector | Detect AI-Generated Text Instantly',
        description: 'Paste any text — get Human Score, AI Score, and a sentence-level heatmap. Free, instant, explainable.',
    },
};

export default function TruthScanPage() {
    return (
        <>
            <Schema schema={getTruthScanProductSchema()} />
            <Schema
                schema={getBreadcrumbSchema([
                    { name: 'Home', url: 'https://utiltoolkits.com' },
                    { name: 'AI Content Detector', url: 'https://utiltoolkits.com/product/ai-content-detector' },
                ])}
            />
            <TruthScanClientWrapper />
        </>
    );
}

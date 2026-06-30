import { Metadata } from 'next';
import TruthScanTool from './TruthScanTool';

export const metadata: Metadata = {
    title: 'AI Content Detector — Analyze Your Text',
    description: 'Paste text and get an instant AI vs Human score with signal breakdown and sentence heatmap.',
    robots: { index: false },
};

export default function TruthScanDetectPage() {
    return <TruthScanTool />;
}

'use client';

import { useRouter } from 'next/navigation';
import TruthScanLanding from './TruthScanLanding';

export default function TruthScanClientWrapper() {
    const router = useRouter();
    return <TruthScanLanding onStart={() => router.push('/product/ai-content-detector/detect')} />;
}

'use client';

import CodeCastLanding from './CodeCastLanding';
import { useRouter } from 'next/navigation';

export default function CodeCastPage() {
    const router = useRouter();
    return <CodeCastLanding onStart={() => router.push('/product/code-cast/animate')} />;
}

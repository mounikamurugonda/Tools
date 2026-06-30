'use client';

import { useRouter } from 'next/navigation';
import CodeCastLanding from './CodeCastLanding';

export default function CodeCastClientWrapper() {
  const router = useRouter();
  return <CodeCastLanding onStart={() => router.push('/product/code-cast/animate')} />;
}

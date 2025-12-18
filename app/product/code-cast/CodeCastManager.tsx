'use client';

import { useState } from 'react';
import CodeCastLanding from './CodeCastLanding';
import CodeCastClient from './CodeCastClient';

export default function CodeCastManager() {
    const [showClient, setShowClient] = useState(false);

    if (showClient) {
        return <CodeCastClient />;
    }

    return <CodeCastLanding onStart={() => setShowClient(true)} />;
}

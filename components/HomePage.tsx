
import HomePageClient from "./HomePageClient";
import { Suspense } from 'react';

export default function HomePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomePageClient />
        </Suspense>
    );
}

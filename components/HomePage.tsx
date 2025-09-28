
import HomePageClient from "./HomePageClient";
import Loader from "./Loader";
import { Suspense } from 'react';

export default function HomePage() {
    return (
        <Suspense fallback={<Loader />}>
            <HomePageClient />
        </Suspense>
    );
}

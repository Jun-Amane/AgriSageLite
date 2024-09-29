import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ClassificationClient = dynamic(
        () => import('./ClassificationClient'),
        { ssr: false }
);

export default function ClassificationPage() {
        return (
                <Suspense fallback={<div>Loading...</div>}>
                        <ClassificationClient />
                </Suspense>
        );
}

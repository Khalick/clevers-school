import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans/grade-7';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1ZNJGePiW-01XykgQPqpEKI4FQF32tgnW', label: 'Grade 7 Lesson Plans' },
                    { id: '1BE0yOZWP86T4_eRI7ddnaf2PAN5ERBnT', label: 'Additional Lesson Plans' },
                ],
            }}
        />
    );
}

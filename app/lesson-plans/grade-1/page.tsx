import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans/grade-1';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1U3HEdj3shI1uAW47NfArqqpBsqKne_fj', label: 'Grade 2 Lesson Plans' },
                    { id: '1vV4BSBuqPsegyQEUdFGu3junwGUr7pbc', label: 'Additional Lesson Plans' },
                ],
            }}
        />
    );
}

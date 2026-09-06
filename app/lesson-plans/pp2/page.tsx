import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans/pp2';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '11glF3PpdUCvK9T2Q3FwBvohItbnphY68', label: 'PP2 Lesson Plans' },
                    { id: '1cSaM6E2_GmmXnmHGK9sevp5WWr3Ex7sR', label: 'Additional Lesson Plans' },
                ],
            }}
        />
    );
}

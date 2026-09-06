import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/topic-tests/mathematics/form-3';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{ kind: 'drive', folderId: '1MfXLceSjCwsABFNNWew4oyvg36QG4dSe' }}
            searchable={false}
        />
    );
}

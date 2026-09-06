import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/nationals/2016';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{ kind: 'drive', folderId: '16-r_cM9HTbBUdBveUc-2I-TVZaF3a64-' }}
            sortByModified
        />
    );
}

import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/quizes/junior/grade-8';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{ kind: 'drive', folderId: '18zP4vYrqmyZbatJyggciN4QySM0t1l7C' }}
            sortByModified
        />
    );
}

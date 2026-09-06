import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/research/thesis';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{ kind: 'firebase', folderPath: 'gs://clevers-school-resources.appspot.com/THESIS AND RESEARCH/THESIS' }}
            pageSize={10}
        />
    );
}

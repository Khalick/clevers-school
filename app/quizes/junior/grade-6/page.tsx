import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/quizes/junior/grade-6';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{ kind: 'firebase', folderPath: 'gs://clevers-school-resources.appspot.com/WEEKLY QUIZES/JUNIOR SECONDARY/GRADE 6' }}
            pageSize={10}
        />
    );
}

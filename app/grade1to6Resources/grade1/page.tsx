import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade1to6Resources/grade1';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1huXhTNmulkh9Mz06BvVkVIgK2eyFHV-O', label: 'Assignments' },
                    { id: '15D59iBDUxICxMMELmFrqwjHDB3-auqku', label: 'Curriculum Designs' },
                    { id: '1jULALE7brYTJiNh7yreumITzIE_tqYS4', label: 'Exams' },
                    { id: '17I2nQsq7fJJcc-JpGzG71G1bIkqHbIZK', label: 'Lesson Plans' },
                    { id: '1skRyIRNFdFB9wHykb2gQfqjEY6hG16tl', label: 'Notes' },
                ],
            }}
        />
    );
}

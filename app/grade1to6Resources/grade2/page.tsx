import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade1to6Resources/grade2';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '19TG2x956qR1kvXGV6FqD4zE5n151hHO4', label: 'Assessments' },
                    { id: '1huXhTNmulkh9Mz06BvVkVIgK2eyFHV-O', label: 'Assignments' },
                    { id: '1RUnNA3DDwov14FSF0g-ochaK6qynKaB_', label: 'Curriculum Designs' },
                    { id: '1cmuShS6rizDUGGnyO5jt0P4V7ZbMxx7j', label: 'Exams' },
                    { id: '1jw5b4uaxIO9WI83lTTrUqAwwRqzXIC4e', label: 'Lesson Plans' },
                    { id: '1du5PSN5b1FdkKSw8KKAquvZwjU22q_u1', label: 'Notes' },
                    { id: '15MOJS_Q5ad2Wn2ctqdirAETN01_gBfof', label: 'Schemes of Work' },
                ],
            }}
        />
    );
}

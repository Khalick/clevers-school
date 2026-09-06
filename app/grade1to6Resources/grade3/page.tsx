import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade1to6Resources/grade3';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1bRSVDTjzrrcoN3GBzE9AJvTuOaQ7lVOO', label: 'Assessments' },
                    { id: '1huXhTNmulkh9Mz06BvVkVIgK2eyFHV-O', label: 'Assignments' },
                    { id: '14gI97maiinYTly_Co1JCN29k6w4GVYDC', label: 'Curriculum Designs' },
                    { id: '1BLD-k2oV3eYljUznH88GcOdKdbsgZWBK', label: 'Exams' },
                    { id: '1s2SU98EqJ9TRiFEhLiEPv9h8NuC6-UJq', label: 'Lesson Plans' },
                    { id: '1y2QYl-byR5AIpEyLVuWjR0OhWy8A_z2F', label: 'Notes' },
                    { id: '1yv6zZWv03Hkd3yGaZswlD7f3_Wk2QBDL', label: 'Schemes of Work' },
                ],
            }}
        />
    );
}

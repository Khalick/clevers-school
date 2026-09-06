import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade1to6Resources/grade4';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1lgKdqT8XEAuAv8gAghjlPKkQ6MN5tK-8', label: 'Assessments' },
                    { id: '1huXhTNmulkh9Mz06BvVkVIgK2eyFHV-O', label: 'Assignments' },
                    { id: '15VF7ZsbybBroOJtC2lJE3tywhOKAmQc8', label: 'Curriculum Designs' },
                    { id: '1h--NvpwqHifwQZBW3bjC88AODCIpRPzl', label: 'Exams' },
                    { id: '1CZMW4DYcJA20GsgwDPJRIb9ouxyRg-RM', label: 'Lesson Plans' },
                    { id: '12okmspQvWIUDFfRXgUQ2ztBfCMrbLo5M', label: 'Notes' },
                    { id: '1j_Kg8S1ExP1mQtFifvWBZwwuDmy4igh4', label: 'Schemes of Work' },
                ],
            }}
        />
    );
}

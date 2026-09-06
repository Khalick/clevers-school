import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade1to6Resources/grade5';

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
                    { id: '1llnEsZr1Ly9DSy88vjyLHJPD1KMcT2kv', label: 'Assignments' },
                    { id: '15QZlaZl2hO0y6QtzKgaklBOTy3Owj1xx', label: 'Curriculum Designs' },
                    { id: '1MwihuE-yXSelhf8_5je7wxcCJA-kJpj3', label: 'Exams' },
                    { id: '1sTRB7zelslrDVpyADea17Go61nW0-7uW', label: 'Lesson Plans' },
                    { id: '1EdWk0bbS4Z-4FeenYZ6x_ddGTRUihVn2', label: 'Notes' },
                    { id: '1XXCd7VwbXr78z1D5aI1nTulVLFAW4khd', label: 'Schemes of Work' },
                ],
            }}
        />
    );
}

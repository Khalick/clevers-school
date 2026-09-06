import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade123456Revision';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Revision material for Grades 1 to 6.',
};

const links = [
    { title: 'Revision Notes', href: '/grade123456Revision/Notes' },
    { title: 'Schemes of Work', href: '/grade123456Revision/schemes' },
    { title: 'Holiday Assignments', href: '/grade123456Revision/holidayAssignment' },
    { title: 'Examination Revision Sets', href: '/grade123456Revision/exams' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Revision material for Grades 1 to 6.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

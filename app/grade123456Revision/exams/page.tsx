import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade123456Revision/exams';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Examination sets by grade.',
};

const links = [
    { title: 'Grade 1', href: '/grade123456Revision/exams/grade1' },
    { title: 'Grade 2', href: '/grade123456Revision/exams/grade2' },
    { title: 'Grade 3', href: '/grade123456Revision/exams/grade3' },
    { title: 'Grade 4', href: '/grade123456Revision/exams/grade4' },
    { title: 'Grade 5', href: '/grade123456Revision/exams/grade5' },
    { title: 'Grade 6', href: '/grade123456Revision/exams/grade6' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Examination sets by grade.</p>
            <SectionGrid links={links} columns={3} />
        </div>
    );
}

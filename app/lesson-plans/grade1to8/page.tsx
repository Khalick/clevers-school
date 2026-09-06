import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans/grade1to8';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Lesson plans for every primary and junior secondary grade.',
};

const links = [
    { title: 'Grade 1', href: '/lesson-plans/grade-1' },
    { title: 'Grade 2', href: '/lesson-plans/grade-2' },
    { title: 'Grade 3', href: '/lesson-plans/grade-3' },
    { title: 'Grade 4', href: '/lesson-plans/grade-4' },
    { title: 'Grade 5', href: '/lesson-plans/grade-5' },
    { title: 'Grade 6', href: '/lesson-plans/grade-6' },
    { title: 'Grade 7', href: '/lesson-plans/grade-7' },
    { title: 'Grade 8', href: '/lesson-plans/grade-8' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Lesson plans for every primary and junior secondary grade.</p>
            <SectionGrid links={links} columns={3} />
        </div>
    );
}

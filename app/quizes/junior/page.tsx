import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/quizes/junior';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Weekly quizzes for Grades 6 to 8.',
};

const links = [
    { title: 'Grade 6', href: '/quizes/junior/grade-6' },
    { title: 'Grade 7', href: '/quizes/junior/grade-7' },
    { title: 'Grade 8', href: '/quizes/junior/grade-8' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Weekly quizzes for Grades 6 to 8.</p>
            <SectionGrid links={links} columns={3} />
        </div>
    );
}

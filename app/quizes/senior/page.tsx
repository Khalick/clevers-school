import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/quizes/senior';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Weekly quizzes for Grades 9 to 12.',
};

const links = [
    { title: 'Grade 9', href: '/quizes/senior/grade-9' },
    { title: 'Grade 10', href: '/quizes/senior/grade-10' },
    { title: 'Grade 11', href: '/quizes/senior/grade-11' },
    { title: 'Grade 12', href: '/quizes/senior/grade-12' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Weekly quizzes for Grades 9 to 12.</p>
            <SectionGrid links={links} columns={3} />
        </div>
    );
}

import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/quizes/elementary';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Weekly quizzes for Grades 1 to 5.',
};

const links = [
    { title: 'Grade 1', href: '/quizes/elementary/grade-1' },
    { title: 'Grade 2', href: '/quizes/elementary/grade-2' },
    { title: 'Grade 3', href: '/quizes/elementary/grade-3' },
    { title: 'Grade 4', href: '/quizes/elementary/grade-4' },
    { title: 'Grade 5', href: '/quizes/elementary/grade-5' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Weekly quizzes for Grades 1 to 5.</p>
            <SectionGrid links={links} columns={3} />
        </div>
    );
}

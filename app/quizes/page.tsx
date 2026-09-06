import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/quizes';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Weekly quizzes by school level.',
};

const links = [
    { title: 'Elementary', href: '/quizes/elementary', description: 'Grades 1–5' },
    { title: 'Junior Secondary', href: '/quizes/junior', description: 'Grades 6–8' },
    { title: 'Senior Secondary', href: '/quizes/senior', description: 'Grades 9–12' },
    { title: 'IGCSE', href: '/quizes/igcse', description: 'Cambridge and Edexcel' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Weekly quizzes by school level.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

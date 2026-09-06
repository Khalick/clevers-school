import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/quizes/igcse';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'IGCSE weekly quizzes.',
};

const links = [
    { title: 'Cambridge', href: '/quizes/igcse/cambridge' },
    { title: 'Edexcel', href: '/quizes/igcse/edexcel' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">IGCSE weekly quizzes.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

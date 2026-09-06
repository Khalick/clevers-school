import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/igcse';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Cambridge and Edexcel international curricula.',
};

const links = [
    { title: 'Cambridge', href: '/igcse/cambridge', description: 'GCSE, O-Level and A-Level' },
    { title: 'Edexcel', href: '/igcse/edexcel', description: 'GCSE and O-Level' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Cambridge and Edexcel international curricula.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

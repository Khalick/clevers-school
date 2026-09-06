import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/igcse/edexcel';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Edexcel resources by level.',
};

const links = [
    { title: 'GCSE', href: '/igcse/edexcel/GCSE' },
    { title: 'O-Level', href: '/igcse/edexcel/O-Level' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Edexcel resources by level.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

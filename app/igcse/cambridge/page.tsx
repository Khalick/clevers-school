import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/igcse/cambridge';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Cambridge resources by level.',
};

const links = [
    { title: 'GCSE', href: '/igcse/cambridge/GCSE' },
    { title: 'O-Level', href: '/igcse/cambridge/O-Level' },
    { title: 'A-Level', href: '/igcse/cambridge/A-Level' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Cambridge resources by level.</p>
            <SectionGrid links={links} columns={3} />
        </div>
    );
}

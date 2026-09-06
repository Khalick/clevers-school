import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/college';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Choose your year of study.',
};

const links = [
    { title: 'Year 1', href: '/college/year-1' },
    { title: 'Year 2', href: '/college/year-2' },
    { title: 'Year 3', href: '/college/year-3' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Choose your year of study.</p>
            <SectionGrid links={links} columns={3} />
        </div>
    );
}

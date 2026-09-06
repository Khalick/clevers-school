import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/nationals';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Mock examinations set by national schools.',
};

const links = [
    { title: 'Alliance High School', href: '/nationals/alliance' },
    { title: 'Alliance Girls High School', href: '/nationals/alliance-girls' },
    { title: 'Mang’u High School', href: '/nationals/mangu' },
    { title: 'Sunshine Secondary', href: '/nationals/sunshine' },
    { title: 'National School Mocks 2016', href: '/nationals/2016' },
    { title: 'Alliance High School Mock 2017', href: '/nationals/2017' },
    { title: 'Sunshine High School Mock', href: '/nationals/2019' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Mock examinations set by national schools.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

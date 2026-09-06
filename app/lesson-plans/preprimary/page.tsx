import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans/preprimary';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Pre-primary lesson plans.',
};

const links = [
    { title: 'PP1 Lesson Plans', href: '/lesson-plans/pp1' },
    { title: 'PP2 Lesson Plans', href: '/lesson-plans/pp2' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Pre-primary lesson plans.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

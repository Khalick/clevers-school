import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/schemes/cbc';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'CBC schemes of work, PP1 to Grade 8.',
};

const links = [
    { title: 'PP1', href: '/schemes/pp1' },
    { title: 'PP2', href: '/schemes/pp2' },
    { title: 'Grade 1', href: '/schemes/grade-1' },
    { title: 'Grade 2', href: '/schemes/grade-2' },
    { title: 'Grade 3', href: '/schemes/grade-3' },
    { title: 'Grade 4', href: '/schemes/grade-4' },
    { title: 'Grade 5', href: '/schemes/grade-5' },
    { title: 'Grade 6', href: '/schemes/grade-6' },
    { title: 'Grade 7', href: '/schemes/grade-7' },
    { title: 'Grade 8', href: '/schemes/grade-8' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">CBC schemes of work, PP1 to Grade 8.</p>
            <SectionGrid links={links} columns={3} />
        </div>
    );
}

import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/research';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Academic writing resources.',
};

const links = [
    { title: 'Essays', href: '/research/essays' },
    { title: 'Research Papers', href: '/research/papers' },
    { title: 'Thesis', href: '/research/thesis' },
    { title: 'Abstracts', href: '/research/abstracts' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Academic writing resources.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

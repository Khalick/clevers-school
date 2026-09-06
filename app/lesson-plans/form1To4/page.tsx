import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans/form1To4';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Lesson plans for every secondary form.',
};

const links = [
    { title: 'Form 1 Lesson Plans', href: '/lesson-plans/form-1' },
    { title: 'Form 2 Lesson Plans', href: '/lesson-plans/form-2' },
    { title: 'Form 3 Lesson Plans', href: '/lesson-plans/form-3' },
    { title: 'Form 4 Lesson Plans', href: '/lesson-plans/form-4' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Lesson plans for every secondary form.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

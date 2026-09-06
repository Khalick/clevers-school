import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/form1234-notes';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Class revision notes for every subject.',
};

const links = [
    { title: 'Form 1 Notes', href: '/form1234-notes/form1', description: 'All subjects' },
    { title: 'Form 2 Notes', href: '/form1234-notes/form2', description: 'All subjects' },
    { title: 'Form 3 Notes', href: '/form1234-notes/form3', description: 'All subjects' },
    { title: 'Form 4 Notes', href: '/form1234-notes/form4', description: 'All subjects' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Class revision notes for every subject.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

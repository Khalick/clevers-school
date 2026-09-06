import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/secondary';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Everything for Form 1 to Form 4, in one place.',
};

const links = [
    { title: 'Form 1–4 Notes', href: '/form1234-notes', description: 'Class revision notes, all subjects' },
    { title: 'Revision Booklets', href: '/revision-booklets', description: 'End-of-topic questions and answers' },
    { title: 'Schemes of Work', href: '/schemes/form1To4', description: 'Term-by-term coverage' },
    { title: 'Lesson Plans', href: '/lesson-plans/form1To4', description: 'For teachers' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Everything for Form 1 to Form 4, in one place.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

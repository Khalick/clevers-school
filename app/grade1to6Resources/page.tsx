import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade1to6Resources';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Curriculum designs and resources for the primary grades.',
};

const links = [
    { title: 'Curriculum Design Materials', href: '/grade1to6Resources/curriculum', description: 'All grades' },
    { title: 'Grade 1', href: '/grade1to6Resources/grade1' },
    { title: 'Grade 2', href: '/grade1to6Resources/grade2' },
    { title: 'Grade 3', href: '/grade1to6Resources/grade3' },
    { title: 'Grade 4', href: '/grade1to6Resources/grade4' },
    { title: 'Grade 5', href: '/grade1to6Resources/grade5' },
    { title: 'Grade 6', href: '/grade1to6Resources/grade6' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Curriculum designs and resources for the primary grades.</p>
            <SectionGrid links={links} columns={3} />
        </div>
    );
}

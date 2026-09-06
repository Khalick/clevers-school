import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade78Resources';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Junior secondary curriculum designs and notes.',
};

const links = [
    { title: 'Grade 7 Curriculum Designs', href: '/grade78Resources/curriculum-grade7' },
    { title: 'Grade 8 Curriculum Designs', href: '/grade78Resources/curriculum-grade8' },
    { title: 'Grade 7 Notes', href: '/grade78Resources/Notes' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">Junior secondary curriculum designs and notes.</p>
            <SectionGrid links={links} columns={2} />
        </div>
    );
}

import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/kcse';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'KNEC past papers, marking schemes and examiner reports, by year.',
};

const links = [
    { title: '2023', href: '/kcse/2023', description: 'Papers, marking schemes & reports' },
    { title: '2022', href: '/kcse/2022', description: 'Papers, marking schemes & reports' },
    { title: '2021', href: '/kcse/2021', description: 'Papers, marking schemes & reports' },
    { title: '2020', href: '/kcse/2020', description: 'Papers & marking schemes' },
    { title: '2019', href: '/kcse/2019', description: 'Papers & marking schemes' },
    { title: '2018', href: '/kcse/2018', description: 'Papers & marking schemes' },
    { title: '2017', href: '/kcse/2017', description: 'Papers & marking schemes' },
    { title: '2016', href: '/kcse/2016', description: 'Papers & marking schemes' },
    { title: '2015', href: '/kcse/2015', description: 'Papers & marking schemes' },
    { title: '2014', href: '/kcse/2014', description: 'Papers & marking schemes' },
    { title: '2013', href: '/kcse/2013', description: 'Papers & marking schemes' },
    { title: '2012', href: '/kcse/2012', description: 'Papers & marking schemes' },
    { title: '2011', href: '/kcse/2011', description: 'Papers & marking schemes' },
    { title: '2010', href: '/kcse/2010', description: 'Papers & marking schemes' },
    { title: '2009', href: '/kcse/2009', description: 'Papers & marking schemes' },
    { title: '2008', href: '/kcse/2008', description: 'Papers & marking schemes' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">KNEC past papers, marking schemes and examiner reports, by year.</p>
            <SectionGrid links={links} columns={3} />
        </div>
    );
}

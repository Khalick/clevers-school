import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'County mock examinations, by year.',
};

const links = [
    { title: '2024 County Mocks', href: '/mocks/2024' },
    { title: '2023 County Mocks', href: '/mocks/2023' },
    { title: '2019 County Mocks', href: '/mocks/2019' },
    { title: '2018 County Mocks', href: '/mocks/2018' },
    { title: '2017 County Mocks', href: '/mocks/2017' },
    { title: '2016 County Mocks', href: '/mocks/2016' },
    { title: '2015 County Mocks', href: '/mocks/2015' },
    { title: '2014 County Mocks', href: '/mocks/2014' },
    { title: '2013 County Mocks', href: '/mocks/2013' },
    { title: '2012 County Mocks', href: '/mocks/2012' },
    { title: '2011 County Mocks', href: '/mocks/2011' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">County mock examinations, by year.</p>
            <SectionGrid links={links} columns={3} />
        </div>
    );
}

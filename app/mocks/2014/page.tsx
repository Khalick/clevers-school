import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks/2014';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1nRJB1r3-Xb6SZPZu-Jmu81NvALy2cBYJ', label: 'Mathematics' },
                    { id: '162sBkGuWcyrMVSYNh0qOkj65fVhTXpHT', label: 'Kiswahili' },
                    { id: '1ODx0nJdItBYPxtVSx3tbfdFUQivzssvH', label: 'Home Science' },
                    { id: '1YlOSBAMkklrWWjAGyRFhIynbi4o5tQya', label: 'History' },
                    { id: '1xLneBJEukBCrZ9dRrtUIrA703GUGuC7P', label: 'Geography' },
                    { id: '1R4ox6h1ob0kLkLQY87WRJa5nPV8h5mB6', label: 'English' },
                    { id: '1EeLJTYBUOnQaGY-ghYDQV1LuvcrG8prz', label: 'CRE' },
                    { id: '1yiT15IOCPAwqt1s6UsnIodjfmvEZevy0', label: 'Computer Studies' },
                    { id: '1SYKL3rxo8NXvixtqXFibKrGC_dlaAjD4', label: 'Chemistry' },
                    { id: '1BUN704kJjhqILNGqXS-gYH7D0thlDr_6', label: 'Business' },
                    { id: '1siq7JmbJxw7ucTehAgITMwQteMwT-bcp', label: 'Biology' },
                    { id: '1GlBfGK8F53wPZwbgYGCTvzWuISkzjnv6', label: 'Agriculture' },
                    { id: '1yftP0oTcch1OFA-mEFuvdujfEMmjc7UH', label: 'Physics' },
                ],
            }}
        />
    );
}

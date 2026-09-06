import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/setbook-guides';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '127baQy13U9u3NoV33ywrRGBuEpb1CM-g', label: 'ENGLISH SET BOOKS GUIDES' },
                    { id: '1ZMRr0-Tf5gHb5V_SGN6ipR2hvMEwD28P', label: 'ENGLISH SET BOOKS NOTES' },
                ],
            }}
        />
    );
}

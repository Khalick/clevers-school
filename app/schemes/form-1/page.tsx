import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/schemes/form-1';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{ kind: 'drive', folderId: '14qXHfKCt2_2Cw8_a2O49Np_sYyOfUTdx' }}
            sortByModified
        />
    );
}

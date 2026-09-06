import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade78Resources/curriculum-grade7';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{ kind: 'drive', folderId: '1wR8yw2mxqhqyzLalS3v85z6aa5sjFuXo' }}
            sortByModified
        />
    );
}

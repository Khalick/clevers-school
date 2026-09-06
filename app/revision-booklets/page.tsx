import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/revision-booklets';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '13-OdW-pg2vHt4CmXVuZRmej9qM6oF-OS', label: 'TopMark' },
                    { id: '1n6gVGwne6Xrz3Ld71WzXF7vCIjT20XiV', label: 'Other Boklets' },
                    { id: '1qObffFDp6qXbv8gyUwE7JLpCqNJkxTxb', label: 'Revision Mocks' },
                    { id: '1hUSMU0iVJnW2eRZV52I2NIaHL7J7yBhV', label: 'KCSE Revision Booklets' },
                    { id: '1WD_Awhav3oI2b8JfAW3FoOgWWwN-h07p', label: '2011 Booklets' },
                ],
            }}
        />
    );
}

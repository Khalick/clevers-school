import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade78Resources/Notes';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '13cvkDMqzdU2RLzxQwObkeOumz4a8KhbH', label: 'Grade 7' },
                    { id: '1l38ixoU5NhSjUKXRd8LCtOjwKbP5-ZwQ', label: 'Grade 8' },
                ],
            }}
        />
    );
}

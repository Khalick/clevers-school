import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/assignments';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '14QQQPHK-0ltcGH95OJEqpssTL9PVGdXi', label: '2024 AUGUST HOLIDAY ASSIGNMENTS' },
                    { id: '1b5WplAKi8iU-rsWKb6_WIJQpCnx3GwU1', label: '2024 APRIL HOLIDAY ASSIGNMENTS' },
                    { id: '16fdWwikTK60bK5YaGJpUvC8cHmNYt8-c', label: '2020 FORM 1-4 ASSIGNMENTS (Revision)' },
                ],
            }}
        />
    );
}

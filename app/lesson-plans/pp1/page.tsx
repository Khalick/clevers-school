import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans/pp1';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1swJLleVaNYTd1fowDVK0FVFufTfSSzGH', label: 'PP1 Lesson Plans' },
                    { id: '1ev2n_kcoaKxQvgZpYBxboHC_AtXeUEfG', label: 'Additional Lesson Plans' },
                ],
            }}
        />
    );
}

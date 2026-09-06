import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade123456Revision/Notes';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1mVxhk9VvRRrXKLAljKWmORC0k6Z6DxzI', label: 'Grade 1' },
                    { id: '1du5PSN5b1FdkKSw8KKAquvZwjU22q_u1', label: 'Grade 2' },
                    { id: '1y2QYl-byR5AIpEyLVuWjR0OhWy8A_z2F', label: 'Grade 3' },
                    { id: '1sc7JOZxSmvKTNZiHIEph7W24WAV1k4_F', label: 'Grade 4' },
                    { id: '1blMO4cU3DUvuB9V139eS8umDpdNnGo6w', label: 'Grade 5' },
                    { id: '1NxDhTPe1g8BvkXUH0PkEQyzIb-77hMvg', label: 'Grade 6' },
                ],
            }}
        />
    );
}

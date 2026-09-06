import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/topic-tests/mathematics';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

/**
 * Previously this imported all four form route components and rendered them
 * eagerly, so opening one subject fired four Drive requests at once and stacked
 * four separate loading panels. As a lazy accordion each form is fetched only
 * when it is opened.
 */
export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-lazy',
                folders: [
                    { id: '1nR1lrGbU6TdCEomb9eUYTqCQ1MAsKPXy', label: 'Form 1' },
                    { id: '1qWloQP3IDwy9DrUdDqYhcWk-6ROtCtJg', label: 'Form 2' },
                    { id: '1MfXLceSjCwsABFNNWew4oyvg36QG4dSe', label: 'Form 3' },
                    { id: '17aj307FMvmjcYN5aQjY1qqzrOJMNtiQl', label: 'Form 4' },
                ],
            }}
        />
    );
}

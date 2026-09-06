import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/topic-tests/English';

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
                    { id: '1qRpa3d8friOJfwV9fZXHL7dmDOe_qLUc', label: 'Form 1' },
                    { id: '1bjZ9C78rLVVVbAjeTOtrIo1cBxxYj8co', label: 'Form 2' },
                    { id: '1NpLqc8pEl1fcEnfuoa4K6Bq4gDrIvyHO', label: 'Form 3' },
                    { id: '1k6-FQLUJwj3Km6GYov7rwITt3HMy1oaA', label: 'Form 4' },
                ],
            }}
        />
    );
}

import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans/form-3';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1jhwmjnWg_x4A2zvcGtiX0WgQb_-UbPDi', label: 'All Subjects Lesson Plans' },
                    { id: '1ciUHtosWHNHJPvqZnwFh8hQFcFpKTiyv', label: 'Physics Lesson Plans' },
                    { id: '1K6aYyySMAKfyzn4NUA6pcQYSItZbvfYV', label: 'Mathematics Lesson Plans' },
                    { id: '1KmFF2x5BM233FD5tHw_ikHC7q51xuir6', label: 'Form 1,2,3 Lesson Plans' },
                    { id: '18tpmoQjWAN1TC4UQJWpquXwBlIykHIMQ', label: 'Chemistry Lesson Plans' },
                    { id: '13tn3J0wdt7eGlvZSyfhFjgbPOLeytMlB', label: 'Biology Lesson plans' },
                ],
            }}
        />
    );
}

import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans/form-2';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1SQUItVcQlic0SL4cvsyru8mrzu0PxGvF', label: 'All Subjects Lesson Plans' },
                    { id: '1XtQFL1Y1Y6NkyAucYWJ0bk-fHrEnf3YW', label: 'Physics Lesson Plans' },
                    { id: '1fdNeTYnsB2yseF-l94hVaSXhqg09bLms', label: 'Mathematics Lesson Plans' },
                    { id: '15Bg1BHMKxYNLHBC3G3Mkanshe3B-kvyv', label: 'Form 1,2,3 Lesson Plans' },
                    { id: '1EDEzouVENcMKEWS1Pnokgq9YWVwUwAPy', label: 'Chemistry Lesson Plans' },
                    { id: '19Faqy6kjKt8vAwHHjxAJKc9IB8ycAmWY', label: 'Biology Lesson plans' },
                ],
            }}
        />
    );
}

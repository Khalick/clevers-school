import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans/form-4';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1iprzBTi1DUaCJgyVOvOTIR33U9nYYFP1', label: 'All Subjects Lesson Plans' },
                    { id: '1yPHdlrhwwS1vRe8uXk2L7oayQTkoQMKj', label: 'Physics Lesson Plans' },
                    { id: '1Cb3bQeV367TqqWXVVf7qyuHuZdNsqHlw', label: 'Mathematics Lesson Plans' },
                    { id: '1gpBein0tGV3iEgiLAjBIbllDGX-Hr7MW', label: 'Form 1,2,3 Lesson Plans' },
                    { id: '1VmjRkK2NFPePGwD0cBJQssH4G2fHjIct', label: 'Chemistry Lesson Plans' },
                    { id: '1GmRmuWjpG489gUgnj2Mf3ndKh825SzNA', label: 'Biology Lesson plans' },
                ],
            }}
        />
    );
}

import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans/form-1';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '12fHsZk5Lm5dIV4UfgC_6-CeuyK7HRFWS', label: 'All Subjects Lesson Plans' },
                    { id: '1hzBvzhbtBu5bFdgA9f7S_acLoButyKix', label: 'Physics Lesson Plans' },
                    { id: '1T53RJxy68U8p6ZkeiX67KBPhBtRT1eK8', label: 'Mathematics Lesson Plans' },
                    { id: '1n4cvsYetoTOh-dTDqm42Z31RlwHhR2Cc', label: 'Form 1,2,3 Lesson Plans' },
                    { id: '12nd1lpE7Dt1yN8u4aJ_agtRzPhgJIrkT', label: 'Chemistry Lesson Plans' },
                    { id: '1vYg3kKl9tstIVSs_onkBz7032jYMnBVL', label: 'Biology Lesson plans' },
                ],
            }}
        />
    );
}

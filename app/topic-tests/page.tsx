import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/topic-tests';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Topic-by-topic tests with questions and answers for Form 1 to Form 4, across twelve subjects.',
};

/**
 * Previously this imported all twelve subject route components, each of which
 * imported its own four form components — so opening /topic-tests fired 48
 * concurrent Google Drive requests and rendered 48 stacked loading panels.
 * It is now a subject index; each subject fetches only when opened.
 */
const subjects = [
    { title: 'Mathematics', href: '/topic-tests/mathematics' },
    { title: 'English', href: '/topic-tests/English' },
    { title: 'Kiswahili', href: '/topic-tests/Kiswahili' },
    { title: 'Biology', href: '/topic-tests/Biology' },
    { title: 'Chemistry', href: '/topic-tests/chemistry' },
    { title: 'Physics', href: '/topic-tests/physics' },
    { title: 'Geography', href: '/topic-tests/Geography' },
    { title: 'History', href: '/topic-tests/History' },
    { title: 'CRE', href: '/topic-tests/cre' },
    { title: 'Agriculture', href: '/topic-tests/Agriculture' },
    { title: 'Business Studies', href: '/topic-tests/Business' },
    { title: 'Computer Studies', href: '/topic-tests/computer' },
];

export default function Page() {
    return (
        <div className="space-y-5">
            <p className="max-w-prose leading-relaxed text-muted-foreground">
                End-of-topic questions and answers for Form 1 to Form 4. Choose a subject,
                then open the form you need.
            </p>
            <SectionGrid links={subjects} columns={3} />
        </div>
    );
}

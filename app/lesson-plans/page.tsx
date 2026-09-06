import type { Metadata } from 'next';

import SectionGrid from '@/components/resources/SectionGrid';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/lesson-plans';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
    description: 'Lesson plans for PP1 and PP2, Grades 1–8 and Form 1–4, plus IGCSE.',
};

/**
 * Previously imported fifteen route components and rendered them all eagerly,
 * firing fifteen concurrent Drive requests on load. Now an index.
 */
const bundles = [
    { title: 'PP1 & PP2 Lesson Plans', href: '/lesson-plans/preprimary', description: 'Pre-primary, both levels' },
    { title: 'Grade 1–8 Lesson Plans', href: '/lesson-plans/grade1to8', description: 'All primary and junior secondary grades' },
    { title: 'Form 1–4 Lesson Plans', href: '/lesson-plans/form1To4', description: 'All secondary forms' },
    { title: 'IGCSE Lesson Plans', href: '/lesson-plans/igcse', description: 'Cambridge and Edexcel' },
];

const byLevel = [
    { title: 'PP1', href: '/lesson-plans/pp1' },
    { title: 'PP2', href: '/lesson-plans/pp2' },
    ...[1, 2, 3, 4, 5, 6, 7, 8].map((g) => ({ title: `Grade ${g}`, href: `/lesson-plans/grade-${g}` })),
    ...[1, 2, 3, 4].map((f) => ({ title: `Form ${f}`, href: `/lesson-plans/form-${f}` })),
];

export default function Page() {
    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight">Complete bundles</h2>
                <SectionGrid links={bundles} />
            </section>
            <section className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight">By class</h2>
                <SectionGrid links={byLevel} columns={3} />
            </section>
        </div>
    );
}

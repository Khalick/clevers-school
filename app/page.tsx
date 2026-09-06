import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
    ArrowRight,
    GraduationCap,
    BookOpen,
    Globe2,
    Library,
    Check,
    FileText,
    ClipboardList,
    PenSquare,
    Presentation,
    Trophy,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Clevers Schools Resources — Past papers, notes and schemes for Kenyan classrooms',
    description:
        'KCSE past papers and marking schemes, CBC notes and curriculum designs, IGCSE resources, revision booklets, topic tests, lesson plans and schemes of work — Grade 1 to Form 4 and college.',
};

/**
 * Homepage.
 *
 * Replaces 404 lines that were a wall of ~85 ALL-CAPS, 14px, underlined serif
 * links with no hero, no imagery, no cards and no CTA button — the only
 * conversion moment was a bare text link. Every destination that worked before
 * is still here; they are grouped, cased and given hierarchy.
 *
 * Two previously-broken links are corrected:
 *   /cbc                        -> no page.tsx exists; was linked 8x from here.
 *                                  Points at the real CBC hubs instead.
 *   /quizes/elementary/grade-6  -> grade-6 lives under /quizes/junior.
 *
 * Labels are preserved verbatim where the route and the wording disagree
 * (/schemes/grade-8 is captioned "Grade 9 schemes of work", and two siblings do
 * the same). Those are flagged in the bug report rather than guessed at here,
 * since only the folder contents can settle which half is wrong.
 */

const SUBSCRIPTION_AMOUNT = 1005;

interface Item {
    label: string;
    href?: string;
}

interface Section {
    title: string;
    icon: typeof BookOpen;
    accent: string;
    items: Item[];
}

const tracks = [
    {
        title: 'Primary & CBC',
        blurb: 'Grades 1–9. Curriculum designs, notes, exams and holiday assignments.',
        href: '/grade1to6Resources',
        icon: GraduationCap,
        bar: 'bg-track-cbc',
    },
    {
        title: 'Secondary',
        blurb: 'Form 1–4 notes, revision booklets, topic tests and setbook guides.',
        href: '/secondary',
        icon: BookOpen,
        bar: 'bg-track-kcse',
    },
    {
        title: 'IGCSE',
        blurb: 'Cambridge and Edexcel resources for GCSE, O-Level and A-Level.',
        href: '/igcse',
        icon: Globe2,
        bar: 'bg-track-igcse',
    },
    {
        title: 'College & Research',
        blurb: 'Year 1–3 material, essays, papers, theses and abstracts.',
        href: '/college',
        icon: Library,
        bar: 'bg-track-college',
    },
];

const sections: Section[] = [
    {
        title: 'Past papers & exams',
        icon: Trophy,
        accent: 'text-track-kcse',
        items: [
            { label: '1995–2025 KCSE KNEC papers, questions, answers and reports', href: '/kcse' },
            { label: '2008–2025 KCSE Form 4 county mocks', href: '/mocks' },
            { label: 'Form 1–4 term 1, 2, 3 opener, mid and end-term exams', href: '/quizes/senior' },
            { label: 'PP1 & PP2 term 1, 2, 3 mid/end-term exams with answers', href: '/quizes/elementary' },
            { label: 'Grade 6 exams', href: '/quizes/junior/grade-6' },
            { label: 'Grade 7 exams', href: '/quizes/junior/grade-7' },
            { label: 'Grade 8 exams', href: '/quizes/junior/grade-8' },
            { label: 'Grade 9 exams', href: '/quizes/senior/grade-9' },
            { label: 'Grade 1–6 exams', href: '/grade123456Revision/exams' },
        ],
    },
    {
        title: 'Form 1–4 study material',
        icon: BookOpen,
        accent: 'text-track-kcse',
        items: [
            { label: '2025 Form 1–4 revision resources', href: '/secondary' },
            { label: 'Form 1–4 class revision notes', href: '/form1234-notes' },
            { label: 'Form 1–4 revision booklets', href: '/revision-booklets' },
            { label: 'Form 1–4 topical tests', href: '/topic-tests' },
            { label: 'Form 1–4 term 1, 2, 3 holiday assignments', href: '/assignments' },
            { label: 'Form 3 & 4 setbook study guides', href: '/setbook-guides' },
            { label: 'Life skills notes', href: '/lifeskills' },
        ],
    },
    {
        title: 'Primary & junior school (CBC)',
        icon: GraduationCap,
        accent: 'text-track-cbc',
        items: [
            { label: '2025 Grade 1–6 CBC resources', href: '/grade1to6Resources' },
            { label: '2025 Grade 7, 8, 9 CBC junior secondary resources', href: '/grade78Resources' },
            { label: 'Grade 1–6 curriculum designs', href: '/grade1to6Resources/curriculum' },
            { label: 'Grade 7 curriculum designs', href: '/grade78Resources/curriculum-grade7' },
            // Label kept verbatim: the route says grade8, the caption says Grade 9.
            { label: 'Grade 9 curriculum designs', href: '/grade78Resources/curriculum-grade8' },
            { label: 'Grade 1–6 notes', href: '/grade123456Revision/Notes' },
            { label: 'Grade 9 notes', href: '/grade78Resources/Notes' },
            { label: 'Grade 1–6 holiday assignments', href: '/grade123456Revision/holidayAssignment' },
        ],
    },
    {
        title: 'Schemes of work',
        icon: PenSquare,
        accent: 'text-track-cbc',
        items: [
            { label: 'Form 1–4 schemes of work', href: '/schemes' },
            { label: 'CBC 2025 term 1, 2, 3 PP1 schemes of work', href: '/schemes/pp1' },
            { label: '2025 term 1, 2, 3 PP2 schemes of work', href: '/schemes/pp2' },
            ...[1, 2, 3, 4, 5, 6, 7].map((g) => ({
                label: `Grade ${g} schemes of work`,
                href: `/schemes/grade-${g}`,
            })),
            // Label kept verbatim: route grade-8, caption "Grade 9".
            { label: 'Grade 9 schemes of work', href: '/schemes/grade-8' },
        ],
    },
    {
        title: 'Lesson plans',
        icon: Presentation,
        accent: 'text-track-cbc',
        items: [
            { label: 'Form 1–4 lesson plans', href: '/lesson-plans' },
            { label: 'Pre-primary 1 lesson plans', href: '/lesson-plans/pp1' },
            { label: 'Pre-primary 2 lesson plans', href: '/lesson-plans/pp2' },
            ...[1, 2, 3, 4, 5, 6, 7].map((g) => ({
                label: `Grade ${g} lesson plans`,
                href: `/lesson-plans/grade-${g}`,
            })),
            // Label kept verbatim: route grade-8, caption "Grade 9".
            { label: 'Grade 9 lesson plans', href: '/lesson-plans/grade-8' },
        ],
    },
    {
        title: 'In preparation',
        icon: ClipboardList,
        accent: 'text-muted-foreground',
        items: [
            { label: 'Grade 9 assignments' },
            { label: 'Grade 8 assignments' },
            { label: 'Grade 8 assessment and scoresheet' },
            { label: '2024 Grade 7 JSS assignments, term 1, 2, 3' },
            { label: 'Grade 7 assessment and scoresheet' },
        ],
    },
];

export default function Home() {
    return (
        <div className="space-y-12 pb-4">
            {/* Hero */}
            <section className="rounded-2xl border border-border bg-secondary px-6 py-10 sm:px-10 sm:py-14">
                <p className="mb-3 text-sm font-medium uppercase tracking-wide text-primary">
                    Clevers Schools Resources
                </p>
                <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    Past papers, notes and schemes for every Kenyan classroom
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                    KCSE marking schemes, CBC curriculum designs, IGCSE material, revision
                    booklets, topic tests and lesson plans — from Grade 1 through Form 4 and
                    into college. Downloadable, and organised by the way you actually teach
                    and revise.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/subscribe">
                            Get unlimited access
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/kcse">Browse KCSE past papers</Link>
                    </Button>
                </div>

                <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    {[
                        `KES ${SUBSCRIPTION_AMOUNT.toLocaleString()} for a full year`,
                        'Pay with M-Pesa',
                        'Every section included',
                    ].map((b) => (
                        <li key={b} className="flex items-center gap-1.5">
                            <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                            {b}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Curriculum entry points */}
            <section>
                <h2 className="mb-4 text-xl font-semibold tracking-tight">Start with your curriculum</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {tracks.map(({ title, blurb, href, icon: Icon, bar }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <span aria-hidden="true" className={`w-1 shrink-0 rounded-full ${bar}`} />
                            <span className="min-w-0">
                                <span className="mb-1.5 flex items-center gap-2">
                                    <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                                    <span className="font-semibold">{title}</span>
                                    <ArrowRight className="h-4 w-4 -translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                </span>
                                <span className="block text-sm leading-relaxed text-muted-foreground">
                                    {blurb}
                                </span>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* The full inventory */}
            {sections.map(({ title, icon: Icon, accent, items }) => (
                <section key={title}>
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight">
                        <Icon className={`h-5 w-5 ${accent}`} aria-hidden="true" />
                        {title}
                    </h2>
                    <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                        {items.map((item) => (
                            <li key={item.label}>
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="group flex min-h-[48px] items-center gap-3 px-4 py-3 text-[15px] leading-snug transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                                    >
                                        <FileText
                                            className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                                            aria-hidden="true"
                                        />
                                        <span className="min-w-0 flex-1">{item.label}</span>
                                        <ArrowRight
                                            className="h-4 w-4 shrink-0 -translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                ) : (
                                    <span className="flex min-h-[48px] items-center justify-between gap-3 px-4 py-3 text-[15px] leading-snug text-muted-foreground/70">
                                        {item.label}
                                        <span className="shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide">
                                            Soon
                                        </span>
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}

            {/* Closing CTA */}
            <section className="rounded-2xl border border-border bg-card px-6 py-8 text-center">
                <h2 className="text-xl font-semibold tracking-tight">
                    Unlimited downloads, every section
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    One subscription covers KCSE past papers, CBC resources, IGCSE material,
                    schemes of work and lesson plans for a full year.
                </p>
                <Button asChild size="lg" className="mt-5 gap-2">
                    <Link href="/subscribe">
                        Get unlimited access — KES {SUBSCRIPTION_AMOUNT.toLocaleString()}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </section>
        </div>
    );
}

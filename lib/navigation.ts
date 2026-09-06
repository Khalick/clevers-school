import type { LucideIcon } from 'lucide-react';
import {
    Home,
    BookOpen,
    GraduationCap,
    Globe2,
    ClipboardList,
    Library,
    School,
    FileText,
    PenSquare,
    Trophy,
    HeartHandshake,
    Presentation,
} from 'lucide-react';

/**
 * The single source of truth for site navigation.
 *
 * Before this file the IA was spread across three components — Navbar (18 links +
 * 30 dropdown items), LeftBar (30) and RightBar (32) — with no shared structure,
 * no active state, and ~26 relative `href="../…"` links in globally-rendered
 * sidebars, which resolved against the current pathname and silently misrouted at
 * depth >= 2. Every href here is absolute.
 *
 * Every destination that existed in those three components is present below.
 * Routes with no page yet are marked `comingSoon` and render as a disabled item
 * with a "Soon" badge instead of a link that 404s.
 */

export type Track = 'cbc' | 'kcse' | 'igcse' | 'college';

export interface NavItem {
    title: string;
    href: string;
    /** No route exists yet — rendered disabled rather than as a broken link. */
    comingSoon?: boolean;
}

export interface NavGroup {
    id: string;
    title: string;
    icon: LucideIcon;
    track: Track;
    /** Open by default in the rail accordion. */
    defaultOpen?: boolean;
    items: NavItem[];
}

/** Compact header nav. The rail and mobile sheet carry the full inventory. */
export const primaryNav: NavItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Primary & CBC', href: '/grade1to6Resources' },
    { title: 'Secondary', href: '/secondary' },
    { title: 'KCSE Papers', href: '/kcse' },
    { title: 'IGCSE', href: '/igcse' },
    { title: 'For Teachers', href: '/lesson-plans' },
    { title: 'College', href: '/college' },
];

const kcseYears = [2023, 2022, 2021, ...Array.from({ length: 13 }, (_, i) => 2020 - i)];
/** app/mocks contains 2011-2019, 2023, 2024 only. The old RightBar advertised
 *  2015-2024, which 404'd for 2020-2022 while app/mocks/page.tsx listed the
 *  correct set. This follows the filesystem. */
const mockYears = [2024, 2023, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];

export const navGroups: NavGroup[] = [
    {
        id: 'secondary',
        title: 'Form 1–4 Study Material',
        icon: BookOpen,
        track: 'kcse',
        defaultOpen: true,
        items: [
            { title: 'All Form 1–4 Resources', href: '/secondary' },
            { title: 'Form 1–4 Notes, All Subjects', href: '/form1234-notes' },
            { title: 'Revision Booklets', href: '/revision-booklets' },
            { title: 'Topic-by-Topic Tests', href: '/topic-tests' },
            { title: 'Holiday Assignments', href: '/assignments' },
            { title: 'Life Skills Notes', href: '/lifeskills' },
            { title: 'Setbook Guides (Kiswahili & English)', href: '/setbook-guides' },
            { title: 'Form 1–4 Syllabus', href: '/syllabus', comingSoon: true },
        ],
    },
    {
        id: 'past-papers',
        title: 'Past Papers & Exams',
        icon: Trophy,
        track: 'kcse',
        defaultOpen: true,
        items: [
            { title: 'KCSE Past Papers — all years', href: '/kcse' },
            ...kcseYears.map((y) => ({ title: `${y} KNEC Papers & Marking Schemes`, href: `/kcse/${y}` })),
        ],
    },
    {
        id: 'mocks',
        title: 'County Mocks',
        icon: ClipboardList,
        track: 'kcse',
        items: [
            { title: 'All County Mocks', href: '/mocks' },
            ...mockYears.map((y) => ({ title: `${y} County Mocks`, href: `/mocks/${y}` })),
        ],
    },
    {
        id: 'nationals',
        title: 'National School Exams',
        icon: School,
        track: 'kcse',
        items: [
            { title: 'All National School Exams', href: '/nationals' },
            { title: 'Alliance High School', href: '/nationals/alliance' },
            { title: 'Alliance Girls High School', href: '/nationals/alliance-girls' },
            { title: 'Mang’u High School', href: '/nationals/mangu' },
            { title: 'Sunshine Secondary', href: '/nationals/sunshine' },
        ],
    },
    {
        id: 'primary',
        title: 'Grades 1–8 (CBC)',
        icon: GraduationCap,
        track: 'cbc',
        defaultOpen: true,
        items: [
            { title: 'Grade 1–6 Curriculum Designs', href: '/grade1to6Resources/curriculum' },
            { title: 'Grade 1–6 Resources', href: '/grade1to6Resources' },
            { title: 'Grade 1–6 Notes', href: '/grade123456Revision/Notes' },
            { title: 'Grade 1–6 Exams', href: '/grade123456Revision/exams' },
            { title: 'Grade 1–6 Holiday Assignments', href: '/grade123456Revision/holidayAssignment' },
            { title: 'Grade 7 Notes', href: '/cbc/notes/grade-7' },
            { title: 'Grade 7–8 Resources', href: '/grade78Resources' },
            { title: 'Grade 8 Curriculum Design', href: '/cbc/curriculum-design/grade-8' },
            { title: 'CBC Holiday Assignment', href: '/cbc/holiday-assignment' },
        ],
    },
    {
        id: 'pre-primary',
        title: 'PP1 & PP2',
        icon: HeartHandshake,
        track: 'cbc',
        items: [
            { title: 'PP1 Resources', href: '/pre-primary/pp1', comingSoon: true },
            { title: 'PP2 Resources', href: '/pre-primary/pp2', comingSoon: true },
            { title: 'Curriculum Design Materials', href: '/pre-primary/design-materials', comingSoon: true },
            { title: 'PP1 & PP2 Examinations', href: '/pre-primary/exams', comingSoon: true },
            { title: 'PP1 & PP2 Revision Materials', href: '/pre-primary/revision-materials', comingSoon: true },
            { title: 'PP1 Notes', href: '/pre-primary/pp1/notes', comingSoon: true },
            { title: 'PP1 Mid-term & End-term Exams', href: '/pre-primary/pp1/exams', comingSoon: true },
            { title: 'PP2 Notes', href: '/pre-primary/pp2/notes', comingSoon: true },
            { title: 'PP2 Schemes of Work', href: '/pre-primary/pp2/schemes', comingSoon: true },
            { title: 'PP2 Mid-term & End-term Exams', href: '/pre-primary/pp2/exams', comingSoon: true },
            { title: 'PP1 & PP2 Lesson Plans', href: '/lesson-plans/preprimary' },
            { title: 'PP1 Schemes of Work', href: '/schemes/pp1' },
            { title: 'PP2 Schemes of Work', href: '/schemes/pp2' },
        ],
    },
    {
        id: 'igcse',
        title: 'IGCSE',
        icon: Globe2,
        track: 'igcse',
        items: [
            { title: 'All IGCSE Resources', href: '/igcse' },
            { title: 'Cambridge — GCSE', href: '/igcse/cambridge/GCSE' },
            { title: 'Cambridge — O-Level', href: '/igcse/cambridge/O-Level' },
            { title: 'Cambridge — A-Level', href: '/igcse/cambridge/A-Level' },
            { title: 'Edexcel — GCSE', href: '/igcse/edexcel/GCSE' },
            { title: 'Edexcel — O-Level', href: '/igcse/edexcel/O-Level' },
            { title: 'IGCSE Quizzes — Cambridge', href: '/quizes/igcse/cambridge' },
            { title: 'IGCSE Quizzes — Edexcel', href: '/quizes/igcse/edexcel' },
        ],
    },
    {
        id: 'lesson-plans',
        title: 'Lesson Plans (Teachers)',
        icon: Presentation,
        track: 'cbc',
        items: [
            { title: 'All Lesson Plans', href: '/lesson-plans' },
            { title: 'PP1 & PP2 Lesson Plans', href: '/lesson-plans/preprimary' },
            { title: 'Grade 1–8 Lesson Plans', href: '/lesson-plans/grade1to8' },
            { title: 'Form 1–4 Lesson Plans', href: '/lesson-plans/form1To4' },
            { title: 'IGCSE Lesson Plans', href: '/lesson-plans/igcse' },
            { title: 'PP1', href: '/lesson-plans/pp1' },
            { title: 'PP2', href: '/lesson-plans/pp2' },
            ...[1, 2, 3, 4, 5, 6, 7, 8].map((g) => ({ title: `Grade ${g}`, href: `/lesson-plans/grade-${g}` })),
            ...[1, 2, 3, 4].map((f) => ({ title: `Form ${f}`, href: `/lesson-plans/form-${f}` })),
        ],
    },
    {
        id: 'schemes',
        title: 'Schemes of Work (Teachers)',
        icon: PenSquare,
        track: 'cbc',
        items: [
            { title: 'All Schemes of Work', href: '/schemes' },
            { title: 'CBC Schemes — Grades 1–8, PP1 & PP2', href: '/schemes/cbc' },
            { title: 'Form 1–4 Schemes', href: '/schemes/form1To4' },
            { title: 'PP1', href: '/schemes/pp1' },
            { title: 'PP2', href: '/schemes/pp2' },
            ...[1, 2, 3, 4, 5, 6, 7, 8].map((g) => ({ title: `Grade ${g}`, href: `/schemes/grade-${g}` })),
            ...[1, 2, 3, 4].map((f) => ({ title: `Form ${f}`, href: `/schemes/form-${f}` })),
        ],
    },
    {
        id: 'quizzes',
        title: 'Quizzes',
        icon: FileText,
        track: 'cbc',
        items: [
            { title: 'All Quizzes', href: '/quizes' },
            { title: 'Elementary — Grades 1–5', href: '/quizes/elementary' },
            { title: 'Junior — Grades 6–8', href: '/quizes/junior' },
            { title: 'Senior — Grades 9–12', href: '/quizes/senior' },
        ],
    },
    {
        id: 'college',
        title: 'College & Research',
        icon: Library,
        track: 'college',
        items: [
            { title: 'College Resources', href: '/college' },
            { title: 'Year 1', href: '/college/year-1' },
            { title: 'Year 2', href: '/college/year-2' },
            { title: 'Year 3', href: '/college/year-3' },
            { title: 'Research', href: '/research' },
            { title: 'Essays', href: '/research/essays' },
            { title: 'Papers', href: '/research/papers' },
            { title: 'Thesis', href: '/research/thesis' },
            { title: 'Abstracts', href: '/research/abstracts' },
        ],
    },
];

/** Header quick-link. Kept separate so it can be styled as the primary action. */
export const homeItem: NavItem = { title: 'Home', href: '/' };
export const homeIcon = Home;

/* ------------------------------------------------------------------ */
/* Breadcrumbs                                                         */
/* ------------------------------------------------------------------ */

/**
 * Segment -> human label. Directory names in this repo use four different
 * conventions (grade1to6Resources, grade123456Revision, form1234-notes,
 * topic-tests) and one misspelling (quizes), none of which should be shown
 * to a student.
 */
export const segmentLabels: Record<string, string> = {
    'form1234-notes': 'Form 1–4 Notes',
    'grade1to6Resources': 'Grade 1–6 Resources',
    'grade123456Revision': 'Grade 1–6 Revision',
    'grade78Resources': 'Grade 7–8 Resources',
    'topic-tests': 'Topic Tests',
    'revision-booklets': 'Revision Booklets',
    'setbook-guides': 'Setbook Guides',
    'lesson-plans': 'Lesson Plans',
    'quizes': 'Quizzes',
    'kcse': 'KCSE Past Papers',
    'igcse': 'IGCSE',
    'cbc': 'CBC',
    'mocks': 'County Mocks',
    'nationals': 'National Schools',
    'secondary': 'Secondary',
    'college': 'College',
    'research': 'Research',
    'assignments': 'Holiday Assignments',
    'lifeskills': 'Life Skills',
    'schemes': 'Schemes of Work',
    'document': 'Document',
    'subscribe': 'Subscribe',
    'subscription': 'Subscription',
    'payment': 'Payment',
    'auth': 'Account',
    'signin': 'Sign In',
    'signup': 'Sign Up',
    'admin': 'Admin',
    'curriculum-design': 'Curriculum Design',
    'holiday-assignment': 'Holiday Assignment',
    'holidayAssignment': 'Holiday Assignments',
    'Notes': 'Notes',
    'notes': 'Notes',
    'exams': 'Exams',
    'curriculum': 'Curriculum Designs',
    'form1To4': 'Form 1–4',
    'grade1to8': 'Grade 1–8',
    'preprimary': 'PP1 & PP2',
    'elementary': 'Elementary',
    'junior': 'Junior',
    'senior': 'Senior',
    'pre-primary': 'PP1 & PP2',
    'alliance-girls': 'Alliance Girls',
    'mangu': 'Mang’u',
    'O-Level': 'O-Level',
    'A-Level': 'A-Level',
    'GCSE': 'GCSE',
};

/** `grade-7` -> `Grade 7`, `form-3` -> `Form 3`, `year-1` -> `Year 1`. */
export function labelForSegment(segment: string): string {
    if (segmentLabels[segment]) return segmentLabels[segment];

    const graded = /^(grade|form|year)-?(\d+)$/i.exec(segment);
    if (graded) {
        const word = graded[1][0].toUpperCase() + graded[1].slice(1).toLowerCase();
        return `${word} ${graded[2]}`;
    }
    if (/^\d{4}$/.test(segment)) return segment;

    return segment
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Which curriculum track a pathname belongs to, for the accent colour. */
export function trackForPath(pathname: string): Track {
    const seg = pathname.split('/').filter(Boolean)[0] ?? '';
    if (['kcse', 'mocks', 'nationals', 'secondary', 'form1234-notes', 'revision-booklets',
        'topic-tests', 'assignments', 'setbook-guides', 'lifeskills'].includes(seg)) return 'kcse';
    if (['igcse'].includes(seg)) return 'igcse';
    if (['college', 'research'].includes(seg)) return 'college';
    return 'cbc';
}

/** The page title shown in the content header — replaces the hardcoded
 *  "KCSE REVISION EDUCATION MATERIALS" that appeared on all 225 routes. */
export function titleForPath(pathname: string): string {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return 'Study Resources';
    return segments.map(labelForSegment).join(' · ');
}

export interface Crumb {
    label: string;
    href: string;
}

export function crumbsForPath(pathname: string): Crumb[] {
    let segments = pathname.split('/').filter(Boolean);

    // /document/<drive file id> — the id is not a label a reader can use, and
    // the page itself shows the real filename as its <h1>.
    if (segments[0] === 'document') segments = ['document'];
    const crumbs: Crumb[] = [];
    let href = '';
    for (const segment of segments) {
        href += `/${segment}`;
        crumbs.push({ label: labelForSegment(decodeURIComponent(segment)), href });
    }
    return crumbs;
}

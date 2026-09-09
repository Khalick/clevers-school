import Link from 'next/link';
import type { Metadata } from 'next';
import { Compass, ArrowLeft, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { navGroups } from '@/lib/navigation';

export const metadata: Metadata = {
    title: 'Page not found | Clevers Schools Resources',
};

/**
 * There was no not-found.tsx, so every bad URL rendered Next's unstyled default
 * page — no header, no navigation, no way back. This keeps people inside the
 * site and offers the most-used sections.
 */
const popular = [
    navGroups.find((g) => g.id === 'past-papers')?.items[0],
    navGroups.find((g) => g.id === 'secondary')?.items[0],
    navGroups.find((g) => g.id === 'primary')?.items[1],
    navGroups.find((g) => g.id === 'mocks')?.items[0],
    navGroups.find((g) => g.id === 'igcse')?.items[0],
    navGroups.find((g) => g.id === 'college')?.items[0],
].filter(Boolean) as { title: string; href: string }[];

export default function NotFound() {
    return (
        <div className="mx-auto max-w-lg py-12 text-center">
            <Compass className="mx-auto mb-4 h-10 w-10 text-muted-foreground" aria-hidden="true" />
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                We couldn&apos;t find that page
            </h1>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted-foreground">
                The link may be out of date, or the section may have moved. Try one of these
                instead.
            </p>

            <ul className="mt-7 flex flex-wrap justify-center gap-2">
                {popular.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className="inline-flex min-h-[40px] items-center rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild className="gap-2">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Back to home
                    </Link>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                    <Link href="/kcse">
                        <Search className="h-4 w-4" />
                        Browse past papers
                    </Link>
                </Button>
            </div>
        </div>
    );
}

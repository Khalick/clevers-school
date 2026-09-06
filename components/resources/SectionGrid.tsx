import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface SectionLink {
    title: string;
    href: string;
    description?: string;
}

/**
 * A grid of links to sub-sections.
 *
 * Used by hub pages, which were previously either a handful of bare coloured
 * text links with no affordance, or — worse — a page that imported a dozen other
 * route components and rendered them all eagerly.
 */
export default function SectionGrid({
    links,
    columns = 2,
}: {
    links: SectionLink[];
    columns?: 2 | 3;
}) {
    return (
        <ul
            className={`grid gap-3 ${columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}
        >
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className="group flex h-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <span className="min-w-0 flex-1">
                            <span className="block font-medium leading-snug">{link.title}</span>
                            {link.description && (
                                <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                                    {link.description}
                                </span>
                            )}
                        </span>
                        <ArrowRight
                            className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                            aria-hidden="true"
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}

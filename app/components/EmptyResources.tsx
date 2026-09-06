'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderOpen, SearchX, ArrowRight } from 'lucide-react';

import { relatedTo } from '@/lib/navigation';
import { routeExists } from '@/lib/routes.generated';

interface EmptyResourcesProps {
    /** The active filter, when the page has a search box. */
    searchQuery?: string;
    /** Overrides the default message for the no-documents case. */
    message?: string;
}

/**
 * Shown when a folder returns no documents.
 *
 * This used to be a single grey sentence — "No documents available at the
 * moment" — on 138 pages, with nowhere to go from it. Since 174 listing pages
 * swallow fetch errors and return [], that sentence was also what a reader saw
 * during an outage.
 *
 * Now it always offers somewhere real to go: the neighbouring form or year
 * first (Form 3 -> Form 4, 2019 -> 2018), then the parent section, then the rest
 * of this page's navigation group. Every suggestion is checked against the
 * generated route manifest before it is offered, so a suggestion can never
 * itself be a dead end.
 */
export default function EmptyResources({ searchQuery, message }: EmptyResourcesProps) {
    const pathname = usePathname();
    const isSearch = Boolean(searchQuery);
    const related = relatedTo(pathname, routeExists);

    return (
        <div className="rounded-lg border border-border bg-muted/50 px-5 py-8 text-center">
            {isSearch ? (
                <SearchX className="mx-auto mb-3 h-8 w-8 text-muted-foreground" aria-hidden="true" />
            ) : (
                <FolderOpen className="mx-auto mb-3 h-8 w-8 text-muted-foreground" aria-hidden="true" />
            )}

            <p className="font-medium">
                {isSearch
                    ? `No documents match “${searchQuery}”`
                    : message ?? 'No documents in this folder yet'}
            </p>
            <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {isSearch
                    ? 'Try a shorter search, or open one of these instead.'
                    : 'These related sections have material you can download.'}
            </p>

            {related.length > 0 && (
                <ul className="mx-auto mt-5 flex max-w-md flex-wrap justify-center gap-2">
                    {related.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="group inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                {item.title}
                                <ArrowRight
                                    className="h-3.5 w-3.5 text-primary opacity-0 transition-opacity group-hover:opacity-100"
                                    aria-hidden="true"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

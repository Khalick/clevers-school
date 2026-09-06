'use client';

import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { AlertCircle, ChevronLeft, ChevronRight, RotateCw, Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import EmptyResources from '@/app/components/EmptyResources';

import FileRow from './FileRow';
import ResourceSkeleton from './ResourceSkeleton';
import { useResources } from './useResources';
import { fileKey, type ResourceFile, type ResourceSource } from './types';

export interface ResourceBrowserProps {
    source: ResourceSource;
    /** Show the filter box. Default true. */
    searchable?: boolean;
    /** Rows per page; false shows everything. Default 25. */
    pageSize?: number | false;
    /** Newest first, when the backend supplies a date. Default false (name order). */
    sortByModified?: boolean;
    /** 'embedded' drops the outer card — used by hub pages that stack several. */
    variant?: 'page' | 'embedded';
    emptyMessage?: string;
}

/**
 * One component for every document listing on the site.
 *
 * It replaces a ~120–270 line file browser that had been copy-pasted into 174
 * page files (~32,800 lines, 90% of all page code) in seven divergent variants.
 * app/kcse/2015 and app/kcse/2016 differed by three lines out of 267, and the
 * copies had already drifted apart in ways nobody intended.
 *
 * Absorbs all four data shapes without losing behaviour: a single Drive folder,
 * several folders shown under headings, several folders as a lazy accordion, and
 * Firebase Storage.
 */
export default function ResourceBrowser({
    source,
    searchable = true,
    pageSize = 25,
    sortByModified = false,
    variant = 'page',
    emptyMessage,
}: ResourceBrowserProps) {
    const { files, loading, error, reload, lazy, loadFolder } = useResources(source);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    // Keeps typing responsive on folders with hundreds of files.
    const deferredQuery = useDeferredValue(query);

    const filtered = useMemo(() => {
        let result = files;
        const q = deferredQuery.trim().toLowerCase();
        if (q) {
            const terms = q.split(/\s+/);
            result = result.filter((f) => {
                const haystack = `${f.name} ${f.mimeType ?? ''}`.toLowerCase();
                return terms.every((t) => haystack.includes(t));
            });
        }
        if (sortByModified) {
            result = [...result].sort((a, b) => {
                if (!a.modifiedTime || !b.modifiedTime) return 0;
                return new Date(b.modifiedTime).getTime() - new Date(a.modifiedTime).getTime();
            });
        }
        return result;
    }, [files, deferredQuery, sortByModified]);

    useEffect(() => {
        setPage(1);
    }, [deferredQuery, files]);

    const perPage = pageSize === false ? Number.POSITIVE_INFINITY : pageSize;
    const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
    const current = Math.min(page, pageCount);
    const visible =
        pageSize === false ? filtered : filtered.slice((current - 1) * perPage, current * perPage);

    const isLazy = source.kind === 'drive-lazy';
    const isGrouped = source.kind === 'drive-multi';

    const shell = (children: React.ReactNode) =>
        variant === 'embedded' ? (
            <div className="overflow-hidden rounded-lg border border-border bg-card">{children}</div>
        ) : (
            <section className="overflow-hidden rounded-xl border border-border bg-card">{children}</section>
        );

    /* ---------------------------------------------------------------- */
    /* Lazy accordion — folders fetched the first time they are opened   */
    /* ---------------------------------------------------------------- */
    if (isLazy) {
        const folders = source.folders;
        return shell(
            <Accordion
                type="multiple"
                className="w-full"
                onValueChange={(open) => open.forEach(loadFolder)}
            >
                {folders.map((folder) => {
                    const state = lazy[folder.id];
                    return (
                        <AccordionItem key={folder.id} value={folder.id} className="border-border px-3 sm:px-4">
                            <AccordionTrigger className="py-3.5 text-left text-[15px] font-medium hover:no-underline">
                                {folder.label}
                            </AccordionTrigger>
                            <AccordionContent className="pb-3">
                                {!state || state.loading ? (
                                    <ResourceSkeleton rows={3} />
                                ) : state.error ? (
                                    <ErrorPanel message={state.error} onRetry={() => loadFolder(folder.id)} />
                                ) : state.files.length === 0 ? (
                                    <EmptyResources message={`No documents in ${folder.label} yet`} />
                                ) : (
                                    <div className="-mx-3 divide-y divide-border sm:-mx-4">
                                        {state.files.map((file) => (
                                            <FileRow key={fileKey(file)} file={file} />
                                        ))}
                                    </div>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>,
        );
    }

    /* ---------------------------------------------------------------- */
    /* Everything else                                                   */
    /* ---------------------------------------------------------------- */
    const toolbar = (searchable || filtered.length > 0) && !loading && !error && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-3 py-3 sm:px-4">
            <p className="text-sm text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? 'document' : 'documents'}
                {deferredQuery.trim() && ` matching “${deferredQuery.trim()}”`}
            </p>
            {searchable && files.length > 0 && (
                <div className="relative w-full sm:w-64">
                    <Search
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                    />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Filter documents…"
                        aria-label="Filter documents"
                        className="pl-9 pr-9"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            aria-label="Clear filter"
                            className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );

    let body: React.ReactNode;
    if (loading) {
        body = <ResourceSkeleton rows={variant === 'embedded' ? 3 : 6} />;
    } else if (error) {
        body = <ErrorPanel message={error} onRetry={reload} />;
    } else if (filtered.length === 0) {
        body = (
            <div className="p-3 sm:p-4">
                <EmptyResources
                    searchQuery={deferredQuery.trim() || undefined}
                    message={emptyMessage}
                />
            </div>
        );
    } else if (isGrouped) {
        const folders = (source as Extract<ResourceSource, { kind: 'drive-multi' }>).folders;
        body = (
            <div className="divide-y divide-border">
                {folders.map((folder) => {
                    const inFolder = visible.filter((f) => f.sectionId === folder.id);
                    if (inFolder.length === 0) return null;
                    return (
                        <div key={folder.id}>
                            <h2 className="bg-muted/60 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-4">
                                {folder.label}
                            </h2>
                            <div className="divide-y divide-border">
                                {inFolder.map((file) => (
                                    <FileRow key={fileKey(file)} file={file} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        body = (
            <div className="divide-y divide-border">
                {visible.map((file: ResourceFile) => (
                    <FileRow key={fileKey(file)} file={file} />
                ))}
            </div>
        );
    }

    return shell(
        <>
            {toolbar}
            {body}
            {pageCount > 1 && !loading && !error && (
                <nav
                    aria-label="Pagination"
                    className="flex items-center justify-between gap-3 border-t border-border px-3 py-3 sm:px-4"
                >
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(current - 1)}
                        disabled={current <= 1}
                        className="gap-1"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {current} of {pageCount}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(current + 1)}
                        disabled={current >= pageCount}
                        className="gap-1"
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </nav>
            )}
        </>,
    );
}

function ErrorPanel({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <div className="px-4 py-8 text-center">
            <AlertCircle className="mx-auto mb-3 h-8 w-8 text-destructive" aria-hidden="true" />
            <p className="font-medium">We couldn’t load these documents</p>
            <p className="mx-auto mt-1 max-w-sm break-words text-sm text-muted-foreground">{message}</p>
            <Button variant="outline" size="sm" onClick={onRetry} className="mt-4 gap-1.5">
                <RotateCw className="h-4 w-4" />
                Try again
            </Button>
        </div>
    );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Download } from 'lucide-react';

import { fileMeta, formatDate, formatSize } from './fileMeta';
import { documentHref, type ResourceFile } from './types';

/**
 * One document.
 *
 * Replaces a hand-rolled row copied into 174 files, where the filename was
 * `truncate`d with no title attribute (so long names like "2019 KCSE Biology
 * Paper 2 Marking Scheme.pdf" were simply cut off), the title colour scored
 * 1.7:1, hover made it lighter still, and 126 of those copies were a bare <div>
 * with an onClick — not focusable, not keyboard-operable, invisible to screen
 * readers.
 *
 * This is a real <Link>, so keyboard and screen-reader support come from the
 * element rather than from bolted-on ARIA.
 */
export default function FileRow({ file }: { file: ResourceFile }) {
    const { Icon, tone, tint, label } = fileMeta(file);
    const size = formatSize(file.size);
    const modified = formatDate(file.modifiedTime);

    return (
        <Link
            href={documentHref(file)}
            title={file.name}
            className="group flex items-center gap-3 px-3 py-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:gap-4 sm:px-4"
        >
            <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tint}`}
                aria-hidden="true"
            >
                <Icon className={`h-5 w-5 ${tone}`} />
            </span>

            <span className="min-w-0 flex-1">
                <span className="block break-words text-[15px] font-medium leading-snug text-foreground sm:text-base">
                    {file.name}
                </span>
                <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                    <span>{label}</span>
                    {size && (
                        <>
                            <span aria-hidden="true">·</span>
                            <span>{size}</span>
                        </>
                    )}
                    {modified && (
                        <>
                            <span aria-hidden="true">·</span>
                            <span>{modified}</span>
                        </>
                    )}
                </span>
            </span>

            <Download
                className="hidden h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary sm:block"
                aria-hidden="true"
            />
            <ChevronRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
            />
        </Link>
    );
}

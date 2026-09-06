import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading placeholder, sized to match FileRow exactly so nothing shifts when the
 * real rows arrive.
 *
 * components/ui/skeleton.tsx existed and was used by no page. Every listing
 * instead early-returned a full-bleed amber panel with a spinner, so each
 * navigation flashed a solid colour block. On a Kenyan 3G connection the Drive
 * call takes 1–3s, which is exactly where perceived quality is won or lost.
 */
export default function ResourceSkeleton({ rows = 6 }: { rows?: number }) {
    return (
        <div className="divide-y divide-border" role="status" aria-label="Loading documents">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-3 sm:gap-4 sm:px-4">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                    <div className="min-w-0 flex-1 space-y-2">
                        {/* Varied widths so it reads as text, not as a bar chart. */}
                        <Skeleton
                            className="h-4"
                            style={{ width: `${[82, 64, 74, 58, 88, 70][i % 6]}%` }}
                        />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            ))}
            <span className="sr-only">Loading documents…</span>
        </div>
    );
}

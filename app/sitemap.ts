import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/constants';
import { ALL_ROUTES } from '@/lib/routes.generated';

/**
 * Generated from the real route tree at build time.
 *
 * The previous public/sitemap.xml was hand-maintained and had drifted badly:
 * 140 of its 176 URLs pointed at routes that do not exist (/books/*,
 * /elementary/*, /junior/*, /senior/*), while 190 real routes were missing. It
 * was advertising mostly dead pages to Google.
 */

/** Not useful in search results, and /admin should never be indexed. */
const EXCLUDED = [
    '/admin',
    '/auth',
    '/payment',
    '/payment-callback',
    '/subscription',
    '/unpaid',
    '/document',
];

function priorityFor(route: string): number {
    if (route === '/') return 1;
    const depth = route.split('/').filter(Boolean).length;
    return depth === 1 ? 0.8 : depth === 2 ? 0.6 : 0.5;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const base = SITE_URL.replace(/\/$/, '');
    const lastModified = new Date();

    return ALL_ROUTES.filter(
        (route) => !EXCLUDED.some((p) => route === p || route.startsWith(`${p}/`)),
    ).map((route) => ({
        url: route === '/' ? base : `${base}${route}`,
        lastModified,
        changeFrequency: route === '/' ? ('daily' as const) : ('weekly' as const),
        priority: priorityFor(route),
    }));
}

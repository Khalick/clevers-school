'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCw, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * Route-level error boundary. Without it a render error anywhere in the tree
 * fell through to app/global-error.tsx, which renders a bare `NextError` with
 * no styling and no way back into the site.
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Route error:', error);
    }, [error]);

    return (
        <div className="mx-auto max-w-lg py-12 text-center">
            <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-destructive" aria-hidden="true" />
            <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted-foreground">
                This page didn&apos;t load properly. Trying again usually fixes it — the
                documents themselves are unaffected.
            </p>
            {error.digest && (
                <p className="mt-3 text-xs text-muted-foreground">Reference: {error.digest}</p>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button onClick={reset} className="gap-2">
                    <RotateCw className="h-4 w-4" />
                    Try again
                </Button>
                <Button asChild variant="outline" className="gap-2">
                    <Link href="/">
                        <Home className="h-4 w-4" />
                        Back to home
                    </Link>
                </Button>
            </div>
        </div>
    );
}

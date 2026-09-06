'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface SubscriptionData {
    id: string;
    startDate: Date;
    expiryDate: Date;
    remainingDays: number;
    status: string;
    reference: string;
    amount: number;
}

/**
 * Subscription state, lifted out of RightBar.
 *
 * It used to sit inside the "MY ACCOUNT" card in the right sidebar — which was
 * `hidden lg:block`, so on a phone a student could never see whether they had an
 * active subscription or how many days were left. It also only rendered for
 * signed-in users, meaning the "Subscribe" prompt was invisible to exactly the
 * people who needed it.
 *
 * Now it renders at the top of the content column, where it is visible on every
 * screen size and sits directly above the resources the subscription unlocks.
 */
export default function SubscriptionBanner() {
    const { status } = useSession();
    const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') return;
        if (status !== 'authenticated') {
            setLoading(false);
            return;
        }

        let cancelled = false;
        (async () => {
            try {
                const res = await fetch('/api/subscription/check');
                const data = await res.json();
                if (!cancelled && data.isSubscribed) setSubscription(data.subscription);
            } catch (err) {
                console.error('Error checking subscription:', err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [status]);

    if (loading || status === 'loading') return null;

    // Active subscription: a quiet confirmation, not a sales pitch.
    if (subscription) {
        const expires = new Date(subscription.expiryDate).toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        return (
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-border bg-accent px-4 py-2.5 text-sm">
                <CheckCircle className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="font-medium text-accent-foreground">Subscription active</span>
                <span className="text-muted-foreground">
                    {subscription.remainingDays} days left · expires {expires}
                </span>
            </div>
        );
    }

    return (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-secondary px-4 py-3">
            <div className="flex min-w-0 items-start gap-2.5">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary-foreground" aria-hidden="true" />
                <div className="min-w-0">
                    <p className="text-sm font-medium text-secondary-foreground">
                        You don&apos;t have an active subscription
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Unlock downloads across every section for a full year.
                    </p>
                </div>
            </div>
            <Button asChild size="sm" className="gap-1.5">
                <Link href="/subscribe">
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </Button>
        </div>
    );
}

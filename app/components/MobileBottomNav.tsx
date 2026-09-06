'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
    Home,
    LayoutGrid,
    Search,
    User,
    LogOut,
    LogIn,
    CheckCircle,
    X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

interface MobileBottomNavProps {
    onOpenNav: () => void;
    onOpenSearch: () => void;
}

/**
 * Phone navigation bar.
 *
 * Was five slots for 25 sections, two of which went nowhere: "Search" linked to
 * `/#search` (no element with that id exists anywhere in the repo) and the
 * profile quick-link to `/profile` (no such route, though middleware.ts protects
 * it). Now four slots that all work: Browse opens the full navigation sheet —
 * the same tree the desktop rail renders — and Search opens the palette.
 */
export default function MobileBottomNav({ onOpenNav, onOpenSearch }: MobileBottomNavProps) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const [sheetOpen, setSheetOpen] = useState(false);
    const isAuthenticated = status === 'authenticated';

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    const itemClass = (active: boolean) =>
        [
            'flex flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-2',
            'min-h-[48px] text-[11px] font-medium transition-colors',
            active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
        ].join(' ');

    return (
        <>
            <nav
                aria-label="Primary mobile"
                className="pb-safe fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/95 backdrop-blur-lg lg:hidden"
            >
                <div className="mx-auto flex max-w-md items-stretch gap-1 px-2">
                    <Link href="/" className={itemClass(isActive('/'))} aria-current={isActive('/') ? 'page' : undefined}>
                        <Home className="h-5 w-5" />
                        Home
                    </Link>

                    <button onClick={onOpenNav} className={itemClass(false)} aria-label="Browse all sections">
                        <LayoutGrid className="h-5 w-5" />
                        Browse
                    </button>

                    <button onClick={onOpenSearch} className={itemClass(false)} aria-label="Search">
                        <Search className="h-5 w-5" />
                        Search
                    </button>

                    <button
                        onClick={() => setSheetOpen(true)}
                        className={itemClass(false)}
                        aria-label={isAuthenticated ? 'Account' : 'Sign in'}
                    >
                        <User className="h-5 w-5" />
                        {isAuthenticated ? 'Account' : 'Sign in'}
                    </button>
                </div>
            </nav>

            {sheetOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                        onClick={() => setSheetOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="animate-slide-up pb-safe fixed inset-x-0 bottom-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-border bg-card p-5 lg:hidden">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                {isAuthenticated ? 'My account' : 'Account'}
                            </h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSheetOpen(false)}
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {isAuthenticated ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 rounded-xl bg-accent p-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                                        {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate font-medium">{session?.user?.name}</p>
                                        <p className="truncate text-sm text-muted-foreground">
                                            {session?.user?.email}
                                        </p>
                                    </div>
                                </div>

                                <Button asChild variant="outline" className="w-full justify-start gap-2">
                                    <Link href="/subscribe" onClick={() => setSheetOpen(false)}>
                                        <CheckCircle className="h-4 w-4" />
                                        My subscription
                                    </Link>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2 text-destructive"
                                    onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign out
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-sm text-muted-foreground">
                                    Sign in to download resources and track your subscription.
                                </p>
                                <Button asChild className="w-full gap-2">
                                    <Link href="/auth/signin" onClick={() => setSheetOpen(false)}>
                                        <LogIn className="h-4 w-4" />
                                        Sign in
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/auth/signup" onClick={() => setSheetOpen(false)}>
                                        Create a free account
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

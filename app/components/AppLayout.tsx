'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import SiteHeader from './SiteHeader';
import NavTree from './NavTree';
import Breadcrumbs from './Breadcrumbs';
import SearchDialog from './SearchDialog';
import SubscriptionBanner from './SubscriptionBanner';
import { titleForPath, trackForPath } from '@/lib/navigation';
import { routeExists } from '@/lib/routes.generated';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

const Footer = dynamic(() => import('./Footer'), { ssr: false });
const MobileBottomNav = dynamic(() => import('./MobileBottomNav'), { ssr: false });

interface AppLayoutProps {
    children: React.ReactNode;
}

/** Left border colour of the page header, by curriculum track. */
const trackBorder: Record<string, string> = {
    cbc: 'border-l-track-cbc',
    kcse: 'border-l-track-kcse',
    igcse: 'border-l-track-igcse',
    college: 'border-l-track-college',
};

/**
 * Application shell. Wraps every route except /unpaid.
 *
 * Replaces a layout that put, above every page's first word: a 3-row 18-button
 * navbar, a permanently EMPTY 96px orange banner, a green bar hardcoded to read
 * "KCSE REVISION EDUCATION MATERIALS" (on IGCSE, Grade 1 CBC, /auth/signin and
 * /admin/users alike), and a search box that returned an error for every query.
 * Content was pinned to ~576px while two sidebars took 50% of the screen and
 * vanished entirely below 1024px.
 *
 * Now: one header, breadcrumbs, a 260px rail, and content up to 880px. The rail's
 * full inventory is reachable on phones through the sheet — nothing is desktop-only.
 */
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const [navOpen, setNavOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // Routes that supply their own full-page composition. Previously only
    // /unpaid escaped the shell, so sign-in, checkout and the admin table each
    // rendered a viewport-tall centred card *inside* a 576px column that already
    // had a green "KCSE REVISION" banner above it.
    const isBareRoute =
        pathname === '/unpaid' ||
        pathname.startsWith('/auth') ||
        pathname.startsWith('/payment') ||
        pathname.startsWith('/subscription') ||
        pathname === '/subscribe' ||
        pathname.startsWith('/admin');

    if (isBareRoute) {
        return (
            <div className="min-h-screen bg-background">
                {pathname !== '/unpaid' && (
                    <SiteHeader
                        onOpenNav={() => setNavOpen(true)}
                        onOpenSearch={() => setSearchOpen(true)}
                    />
                )}
                {children}
                <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
                <MobileNavSheet open={navOpen} onOpenChange={setNavOpen} />
            </div>
        );
    }

    const track = trackForPath(pathname);
    const isHome = pathname === '/';
    // A URL with no page behind it must not get a title invented from its own
    // path — /this-does-not-exist would render "This Does Not Exist" as an <h1>
    // above the 404 message, implying the page is real.
    const isKnownRoute = routeExists(pathname) || pathname.startsWith('/document');
    // /document/[name] renders its own <h1> from the real filename; the
    // route-derived title there would just be a URL-encoded Drive file id.
    const providesOwnTitle = isHome || pathname.startsWith('/document') || !isKnownRoute;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader
                onOpenNav={() => setNavOpen(true)}
                onOpenSearch={() => setSearchOpen(true)}
            />

            {/* Breadcrumb bar — omitted on the homepage, where it says nothing. */}
            {!isHome && isKnownRoute && (
                <div className="border-b border-border bg-muted/40">
                    <div className="mx-auto max-w-[1440px] px-4 py-2.5 sm:px-6">
                        <Breadcrumbs />
                    </div>
                </div>
            )}

            <div className="mx-auto flex w-full max-w-[1440px] flex-1 gap-8 px-4 sm:px-6">
                {/* Desktop rail. Fixed 260px, not 25% — the old 25/25 split left
                    the content column at ~576px on any screen size. */}
                <aside
                    className="hidden w-[260px] shrink-0 lg:block"
                    aria-label="Section navigation"
                >
                    <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-6 pr-1">
                        <NavTree />
                    </div>
                </aside>

                <main className="w-full min-w-0 max-w-[880px] flex-1 py-6">
                    <SubscriptionBanner />
                    {!providesOwnTitle && (
                        <div className={`mb-5 border-l-4 pl-4 ${trackBorder[track]}`}>
                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                {titleForPath(pathname)}
                            </h1>
                        </div>
                    )}
                    {children}
                </main>
            </div>

            <Footer />
            <MobileBottomNav
                onOpenNav={() => setNavOpen(true)}
                onOpenSearch={() => setSearchOpen(true)}
            />

            <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
            <MobileNavSheet open={navOpen} onOpenChange={setNavOpen} />
        </div>
    );
};

/**
 * The full navigation inventory on phones. LeftBar and RightBar were
 * `hidden lg:block` with no mobile equivalent, so ~62 destinations were
 * unreachable below 1024px.
 */
function MobileNavSheet({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
}) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-0">
                <SheetHeader className="border-b border-border px-4 py-4 text-left">
                    <SheetTitle>Browse resources</SheetTitle>
                </SheetHeader>
                <div className="px-2 py-2 pb-20">
                    <NavTree onNavigate={() => onOpenChange(false)} />
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default AppLayout;

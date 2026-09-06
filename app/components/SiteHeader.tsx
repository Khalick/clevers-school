'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { LogIn, LogOut, User, Menu, Search } from 'lucide-react';

import { Logo } from './Logo';
import { primaryNav } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SiteHeaderProps {
    onOpenNav: () => void;
    onOpenSearch: () => void;
}

/**
 * The old navbar was a 3x6 grid of 18 uppercase buttons plus two 15-item hover
 * dropdowns — 48 links, no logo, and no indication of which one you had clicked
 * (it never imported usePathname). Between 768px and 1023px the six columns
 * truncated labels mid-word while the sidebars were already hidden.
 *
 * This is a single row: brand, seven primary sections with a real active state,
 * search, account. The full inventory lives in the rail and the mobile sheet.
 */
export default function SiteHeader({ onOpenNav, onOpenSearch }: SiteHeaderProps) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
            <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6">
                {/* Mobile: open the full navigation sheet */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={onOpenNav}
                    aria-label="Open navigation"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <Link href="/" className="flex shrink-0 items-center" aria-label="Clevers Schools — home">
                    <Logo className="h-9 w-24 sm:h-10 sm:w-28" />
                </Link>

                <nav aria-label="Primary" className="hidden lg:flex flex-1 items-center gap-1">
                    {primaryNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive(item.href) ? 'page' : undefined}
                            className={[
                                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                isActive(item.href)
                                    ? 'bg-accent text-accent-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                            ].join(' ')}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-1">
                    <Button
                        variant="outline"
                        onClick={onOpenSearch}
                        className="hidden gap-2 text-muted-foreground sm:flex"
                        aria-label="Search resources"
                    >
                        <Search className="h-4 w-4" />
                        <span className="hidden md:inline">Search resources…</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="sm:hidden"
                        onClick={onOpenSearch}
                        aria-label="Search resources"
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Account menu">
                                    <User className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-60">
                                <DropdownMenuLabel className="font-normal">
                                    <p className="text-sm font-medium">{session?.user?.name}</p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {session?.user?.email}
                                    </p>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/subscribe">My subscription</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="mailto:support@schoolresources.clevers.co.ke">
                                        Contact support
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild size="sm" className="gap-2">
                            <Link href="/auth/signin">
                                <LogIn className="h-4 w-4" />
                                <span className="hidden sm:inline">Sign in</span>
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}

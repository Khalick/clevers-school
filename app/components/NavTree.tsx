'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navGroups, type NavGroup, type NavItem } from '@/lib/navigation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const trackBar: Record<NavGroup['track'], string> = {
    cbc: 'bg-track-cbc',
    kcse: 'bg-track-kcse',
    igcse: 'bg-track-igcse',
    college: 'bg-track-college',
};

interface NavTreeProps {
    /** Called after a link is followed — lets the mobile sheet close itself. */
    onNavigate?: () => void;
}

/**
 * The complete navigation inventory, rendered once and used in two places:
 * the desktop rail and the mobile sheet.
 *
 * Previously LeftBar (30 links) and RightBar (32 links) were `hidden lg:block`
 * with no mobile equivalent, so ~62 destinations simply ceased to exist below
 * 1024px — on a phone-first audience. Sharing this component is what makes the
 * phone drawer complete rather than a second, smaller menu.
 */
export default function NavTree({ onNavigate }: NavTreeProps) {
    const pathname = usePathname();

    const groupContainsPath = (group: NavGroup) =>
        group.items.some((i) => pathname.startsWith(i.href) && i.href !== '/');

    // Open the group you are currently inside, plus the defaults.
    const defaultOpen = navGroups
        .filter((g) => g.defaultOpen || groupContainsPath(g))
        .map((g) => g.id);

    return (
        <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
            {navGroups.map((group) => {
                const Icon = group.icon;
                return (
                    <AccordionItem key={group.id} value={group.id} className="border-border">
                        <AccordionTrigger className="gap-2 py-3 text-left hover:no-underline">
                            <span className="flex min-w-0 items-center gap-2.5">
                                <span
                                    aria-hidden="true"
                                    className={`h-5 w-1 shrink-0 rounded-full ${trackBar[group.track]}`}
                                />
                                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                                <span className="truncate text-sm font-semibold">{group.title}</span>
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-2">
                            <ul className="space-y-0.5 pl-3.5">
                                {group.items.map((item) => (
                                    <li key={`${group.id}-${item.href}-${item.title}`}>
                                        <NavLeaf item={item} pathname={pathname} onNavigate={onNavigate} />
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}

function NavLeaf({
    item,
    pathname,
    onNavigate,
}: {
    item: NavItem;
    pathname: string;
    onNavigate?: () => void;
}) {
    const active = pathname === item.href;

    return (
        <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={[
                'block rounded-md px-2.5 py-2 text-sm leading-snug transition-colors',
                'min-h-[44px] flex items-center', // touch target floor
                active
                    ? 'bg-accent font-medium text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            ].join(' ')}
        >
            {item.title}
        </Link>
    );
}

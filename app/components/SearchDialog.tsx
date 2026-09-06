'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { navGroups } from '@/lib/navigation';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';

interface SearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/**
 * Jump-to-section palette over the 108 live navigation destinations.
 *
 * Context: AppLayout used to render `<SearchBar folderId='' />` above every page,
 * and app/api/drive/search/route.ts returns 400 when folderId is empty — so the
 * most prominent control on the site returned an error for every query on all
 * 225 routes. Searching *inside* documents needs a Drive folder registry (see the
 * bug report); this replaces a control that never worked with one that does, and
 * it needs no API call.
 *
 * Per-page file filtering is unaffected — the listing pages keep their own search
 * inputs, which have always worked because they are given a real folder id.
 */
export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    const router = useRouter();

    // Cmd/Ctrl-K anywhere.
    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onOpenChange]);

    const go = (href: string) => {
        onOpenChange(false);
        router.push(href);
    };

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Search for a subject, grade, year or paper…" />
            <CommandList>
                <CommandEmpty>
                    No section matches that. Try a grade (&quot;Grade 7&quot;), a form
                    (&quot;Form 3&quot;) or a year (&quot;2019&quot;).
                </CommandEmpty>
                {navGroups.map((group) => {
                    const items = group.items.filter((i) => !i.comingSoon);
                    if (items.length === 0) return null;
                    return (
                        <CommandGroup key={group.id} heading={group.title}>
                            {items.map((item) => (
                                <CommandItem
                                    key={`${group.id}-${item.href}-${item.title}`}
                                    // Include the group title so "kcse 2019" matches.
                                    value={`${group.title} ${item.title} ${item.href}`}
                                    onSelect={() => go(item.href)}
                                >
                                    {item.title}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    );
                })}
            </CommandList>
        </CommandDialog>
    );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';

import { crumbsForPath } from '@/lib/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

/**
 * components/ui/breadcrumb.tsx already existed and was imported by exactly zero
 * files. Routes here go four segments deep (/topic-tests/Kiswahili/form-3,
 * /grade123456Revision/exams/grade4, /igcse/cambridge/A-Level) and a student had
 * no indication of where they were and no way back — the page header said
 * "KCSE REVISION EDUCATION MATERIALS" regardless.
 */
export default function Breadcrumbs() {
    const pathname = usePathname();
    const crumbs = crumbsForPath(pathname);

    if (crumbs.length === 0) return null;

    return (
        <Breadcrumb className="min-w-0">
            <BreadcrumbList className="flex-nowrap overflow-x-auto sm:flex-wrap">
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/" aria-label="Home" className="flex items-center gap-1">
                            <Home className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">Home</span>
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {crumbs.map((crumb, i) => {
                    const isLast = i === crumbs.length - 1;
                    return (
                        <React.Fragment key={crumb.href}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="whitespace-nowrap">
                                {isLast ? (
                                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={crumb.href}>{crumb.label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

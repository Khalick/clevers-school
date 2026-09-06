import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/igcse/cambridge/GCSE';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-lazy',
                folders: [
                    { id: '1m6rj3NtMX1Y-IttE27iVE9Qgu4NSong2', label: 'Physics' },
                    { id: '1K3TE0T8KolBicSLEHozecxuynlnYGheI', label: 'Music' },
                    { id: '1LtD1ADJJ48cbJFYXLCgssYKf1MiBnPDv', label: 'Mathematics' },
                    { id: '1pu2QqQU7JQIGrn6tYTEgi_GdKcj-gDq-', label: 'History' },
                    { id: '1lPFvH0aQCdIvEaQQKSntZydJ82_euV3U', label: 'Geography' },
                    { id: '1BUZjO9it1_zzev-CgyeDzxjFK_c7VU00', label: 'French' },
                    { id: '1rNtJHlg0UOpZIQav-On3S0X8u5XsK2Kd', label: 'English' },
                    { id: '1BXZekjnuj1fAGvFbgK0YD3t-D4Lp5Sli', label: 'Computing' },
                    { id: '108BET0A-2RyJ_nVNAKQnK_1yN3rcbV-Z', label: 'Computer Science' },
                    { id: '113p7H9X3JEtO9lA_ZmgDDEM9Z8ut622S', label: 'Chemistry' },
                    { id: '1fdIwFRC-PXVLiVTlxdiklYG97xeDWvvd', label: 'Business' },
                    { id: '1CCsTsc7g7DXRZxIhis3KiBATi9mS9Sa1', label: 'Biology' },
                    { id: '1tKiu5Ljm0REobeJHME2U2-dTPo5_-_ec', label: 'Art & Design' },
                    { id: '1DptldHhxEIDWwzC3L386IESVTZ-rTk8E', label: 'Accounting' },
                ],
            }}
        />
    );
}

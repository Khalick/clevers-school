import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/igcse/edexcel/O-Level';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-lazy',
                folders: [
                    { id: '1R2gu8wU09Q3CHhUAmxig_e1v6jBK7vZK', label: 'English Literature' },
                    { id: '1B9KuseVQqnW4j6vm_IiHlPrISdSdeuN3', label: 'Religious Studies' },
                    { id: '15e5JYxolvLPZQbB4uyshFv66Ht8MAqBz', label: 'German' },
                    { id: '1kSgN40iRo5BENlLdgHtGMq7D8bNxTAuy', label: 'Physics' },
                    { id: '1vf7CH6QuyLLiPDIWgMOIocHGmaYa1Ko0', label: 'Swahili' },
                    { id: '1g2EpsXyHJBULwNJkqeVxayFSoWprctpp', label: 'Mathematics' },
                    { id: '1W9fZ82shnybbBQPMF-ttSykMl-lbTk2B', label: 'History' },
                    { id: '1VIZZIxcZwNdCS6pH3iSZtDfyyHe8xTz2', label: 'Geography' },
                    { id: '1xpwuaCRLgnEZnyi3Q2TV57ei-z_azc0e', label: 'French' },
                    { id: '1Ka7lUWQCf_MBqSQWfzRwu9c9Vujr5h9J', label: 'English' },
                    { id: '1mi_KSjhu-f2OD6DhIo98vu6nmP2f3V2s', label: 'Law' },
                    { id: '1oLs52-Eo2Zf428u2FYZ-NBdXJyz8RG2Z', label: 'Computer Science' },
                    { id: '1XzBaTY0qI_vlTXwGxRQ507w4Q_sqXzvb', label: 'Chemistry' },
                    { id: '1RE9jMeur7-BnJTc8QYRZEdcE0jeIBaEL', label: 'Business' },
                    { id: '1ZRRayHP1-j0Aj4jFNC9dCjqPorkvDVdg', label: 'Economics' },
                    { id: '14LEhFDCQDvOtjUz19ey7a6FX6AZbiUr-', label: 'Art & Design' },
                    { id: '1Au4LIW_NZjgsgkafmSVFou92PtEA3ZE_', label: 'Accounting' },
                ],
            }}
        />
    );
}

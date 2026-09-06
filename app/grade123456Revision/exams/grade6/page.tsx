import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade123456Revision/exams/grade6';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '18TTFGflI0ULCwC1ecv41siX_oizir8V_', label: 'SET 1' },
                    { id: '1yJffly2n8rInYICTEmiDCXAxMnlxGWlv', label: 'SET 2' },
                    { id: '1q9vRxB2Lj8lMlB1n8oiGG4hDX8wEcO1K', label: 'SET 3' },
                    { id: '1OO6yuz7ZaYatvSqBgHL10vvgxg5FrBBz', label: 'SET 4' },
                    { id: '18mwYIX3rjp_3C34mXlURUF7__9J2yD0C', label: 'SET 5' },
                    { id: '1fJ0GYiONkzA9iOl0pcBooOxfdIjM-XeG', label: 'SET 6' },
                    { id: '1L87RZonYRn_9PzuAoKF_zvV8A5Pd6uh5', label: 'SET 7' },
                ],
            }}
        />
    );
}

import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade123456Revision/exams/grade2';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1YDSHF7bYPgLZNnN3RJnbWwQdoVxfqeZC', label: 'SET 1' },
                    { id: '1a3rlc2-900xo-Mss0aH3KJrzNPXDnu1O', label: 'SET 2' },
                    { id: '1LE_ZYuxAvuPKtsLajc9vlbeOsbr49-o1', label: 'SET 3' },
                    { id: '1oJ18CSAOScxWW2pOyMiSBJEODc2AWccX', label: 'SET 4' },
                    { id: '1AjGib0oZHwwMPneGT9Y_yLUOssKC5Aop', label: 'SET 5' },
                    { id: '1HLvKDo2JLlijVRhU-BX7qoI7VcMLxsmt', label: 'SET 6' },
                    { id: '1EGZIIN4g7PiTmlr5-vaZicfy2RiD8N6h', label: 'SET 7' },
                    { id: '16Qddbv8FYUuozI2DLgBQtcFZv4UmreSO', label: 'SET 8' },
                    { id: '1lhI7Um_yAleDwdFKoorV5LHY_DP0A8eO', label: 'SET 9' },
                    { id: '1qjoSAGMgx7Z7k7yhgWQfGIYKs82TO6nA', label: 'SET 10' },
                    { id: '1VPr3JC1-aEpNz7eY_u9hbYkkbDkigyXy', label: 'SET 11' },
                ],
            }}
        />
    );
}

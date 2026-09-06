import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks/2012';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1W_L90pCQM7InlXOR8I852fK0cgyPZ0R8', label: 'Teso South' },
                    { id: '1fAvu4A1DcQ-vaG0U4foYKZw9TdNDT7Fi', label: 'Mbitsuba' },
                    { id: '1wQzF-Ney34w36D4U4JPhVY9cwWXHerBI', label: 'West Marakwet' },
                    { id: '1VJZTFUq6pj5v3HYo9v4-OtVL-TNOofWb', label: 'Loitoktok' },
                    { id: '1DvdEXWANvo7OGv5j06gZm3-MfcIQjsv1', label: 'Kwanza' },
                    { id: '1xA02X-Qg2ka_qso2GbIQSt1iq1IefAb4', label: 'Butere' },
                    { id: '1_VrchiJ6QmCBMnL_W_Y1uKUt7eSf1DP7', label: 'Bureti' },
                    { id: '1ILIH8HdP_DhqgeVkmB1pvT54yWuNQzt0', label: 'Bungoma' },
                    { id: '10ijAyu39y3vFtpPQWtKRW4JZE8tVCQeM', label: 'Boruba-Masaba' },
                    { id: '12bCn5vIYS2_cEYn_hlOZBiCm0hrR9Emd', label: 'Transzoia' },
                ],
            }}
        />
    );
}

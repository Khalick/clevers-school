import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/schemes/form1To4';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1EGz6GMWGip1rjSXQpz5yInpDO6Ee2cCf', label: 'Form 4 Schemes of Work' },
                    { id: '1AfR2TjRmoh1QTr8qNFLBPatMyxLP_Mvz', label: 'Form 3 Schemes of Work' },
                    { id: '1DQXyXS8ELL2BE4w92fjz09lUPw5o7yxG', label: 'Form 2 Schemes of Work' },
                    { id: '14qXHfKCt2_2Cw8_a2O49Np_sYyOfUTdx', label: 'Form 1 Schemes of Work' },
                ],
            }}
        />
    );
}

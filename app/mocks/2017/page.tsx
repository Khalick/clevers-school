import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks/2017';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1oA3cageegNyi05SO2nRCWre4MD0DIQS3', label: 'Westlands' },
                    { id: '1raAeZ-5oKmxqosBPZ9caNR4UzuLHuwhe', label: 'Sukemo' },
                    { id: '1I_zcXWkQmmh1DUfvTa-LgN_x6M2lohuQ', label: 'Perfector' },
                    { id: '16QHHR-0VMgfRGmCiG0wCuHfxjQw9PLRA', label: 'Muungano joint' },
                    { id: '1M9AnWnFdLTNGUdFoYnwRX8VWsVrq7V5J', label: 'Muranga' },
                    { id: '1WRKkeaX4zu6fBPM1fGCI9BIsocC57dt6', label: 'Mokasa' },
                    { id: '1HFbJZPZJlgmk1SLxFPQe5EnrYrWwp9Ys', label: 'Set 7' },
                    { id: '12C0Dx0hVbikGt8EYRHrIwhLvK5IWH0cb', label: 'Kirinyaga' },
                    { id: '12ussTtI_V2cRtFcc2osDf3aTDtJ_MiRm', label: 'Kassu' },
                    { id: '1xEjiVp8mBGeiaj24feoV1xuqVyDYtyrZ', label: 'High Score' },
                    { id: '11XFRwozyXPyniUXWFhnG1OJZHhz4fZrs', label: 'Compliant' },
                    { id: '14JWdQIrF6bGfYmlnwH9YSAt2qYOhs7iX', label: 'Cekana' },
                ],
            }}
        />
    );
}

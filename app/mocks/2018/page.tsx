import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks/2018';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1z7ZviTT9f3XxCIrOmw8lOGLiQHse9yl7', label: 'KCSE Mocks Past Papers' },
                    { id: '1i_th-TiTrkOcMs2LJqlWPuuu24OEic_v', label: 'Kedijet Joint' },
                    { id: '1B1Xyto9G2c0XE6lazl1PV2g_H9Io6eNJ', label: 'Samia' },
                    { id: '1CKEEcjg4A5H0C3KLfZ1UIqMZtN_Vl6x0', label: 'Nyandarua' },
                    { id: '1I1TiiqR3PUO_Q69riiFkukqiDGdGyMod', label: 'Central National' },
                    { id: '10-kvOfprQUeIBVAH2cCf4Vi6zbwuald9', label: 'Nairobi Joint' },
                    { id: '1bMRHbEvKxdPBc5OtcTU79gm4bfUPGVE0', label: 'Kassu' },
                    { id: '1xC7KZ4ktfwrF5TC5YftutbEhQMrg6ySm', label: 'Mokasa' },
                    { id: '1pmVhD9Y9B8jbLIcS2aw5KUqFnffvd-CD', label: 'Maranda' },
                    { id: '1hl848DeIv7Il23yv6RMTPVwbCnZelsyf', label: 'Achievers' },
                    { id: '1Lt1RGN2NnQaT77rlrt8HtKfNOp3viZDr', label: 'Mosta' },
                    { id: '1vUmGGRVaRWP4YDtjI_rrelgK5BXXv6RZ', label: 'Kakamega' },
                    { id: '1-dpEMJpdfDPM48uoRN1vXtElc_0_LUpF', label: 'Gatanga' },
                ],
            }}
        />
    );
}

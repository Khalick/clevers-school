import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks/2016';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1jyq6_q9F24E5GbOq098omLppsArEEmqN', label: 'Westlands' },
                    { id: '1JFVgO9vnr_YmqzY3w3_6KHTWIFMONpWz', label: 'Tharaka' },
                    { id: '1Ag3op7teuI_mW6z_UCbwYO_Gv02dA5M4', label: 'Sukemo' },
                    { id: '1Qgka3reBlhIdwBMaGYsEcbF6eDHITU4k', label: 'SET August' },
                    { id: '1CibEFC8jD_M9Dgs5ELOhQRbaTGrV4ras', label: 'Samata' },
                    { id: '1cg_pcmWQRbtRcJq6Ipwxkv8pNrWmlcW3', label: 'Post Mock' },
                    { id: '1A47xnJJhbVONDwTD8WUJGT8_2PX2zHvN', label: 'Muranga East' },
                    { id: '1OYv8nsxkqvmGD5eqV-WCH-2lEo67Xt8l', label: 'Lugali' },
                    { id: '1uIUSGlJhE9GKkuMx31dqRU53eQ0VIMV5', label: 'Kirinyaga East' },
                    { id: '1kjoosQ6YPzeIE73U6M4WxHwyXCafcKnR', label: 'Kirinyaga Central' },
                    { id: '1PpB-C74-Lho-kpo9FJZslrj_8igXhRMA', label: 'Kassu' },
                    { id: '1Bmb-06mSylpUi7yAF5IVIc-D7TNRrTdo', label: 'Kandara' },
                    { id: '1xTLsKlLsKAXEfX18OsnQ6cUESHtdL9PI', label: 'Kakamega' },
                    { id: '14GpCHLfobyA130lfvV3P-38aeKhg8hor', label: 'Joint Mock' },
                    { id: '1YOmxmSJ2AeZFnFIwTqsOvSlucLOq_kgP', label: 'Gucha South' },
                    { id: '1pd22ZvS4BoAG-3aUb52f_Y39AI_DT9Lp', label: 'Gucha' },
                    { id: '1uHIC1W3FEiO5S66B_GgtHc7oX0ikVgTZ', label: 'Gem' },
                    { id: '1C0sqEXtXJtz2eXUJ477xYnDV_QI1GRBo', label: 'Eskika' },
                    { id: '1pYXHaPWKYu-vGrZ9JRVLNqEiv7a9DHIx', label: 'Busia' },
                    { id: '1_yp8hjq0NqL-kMDbasj577i4JotkDVL2', label: 'Bureti' },
                    { id: '1SY3gv3wBIK8pwP76DaU-l0nCWuoOltcX', label: 'Baringo' },
                ],
            }}
        />
    );
}

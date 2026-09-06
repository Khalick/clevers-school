import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade123456Revision/exams/grade5';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1GI-jSi-kGkWS35EIU4_eWBDCjz-xt3On', label: 'SET 1' },
                    { id: '1rEeJzn0UjYGltbLrdVIj1Vb0WcG4cEsf', label: 'SET 2' },
                    { id: '13sm82c28Y4DdmjBxTzM-0lY5_LrLTBOu', label: 'SET 3' },
                    { id: '154CqHuUEtNGlcY1P1D215P_f7ERqgDxi', label: 'SET 4' },
                    { id: '1bk5D2p171Fg7mANdpUSC2EhKbmjW54xI', label: 'SET 5' },
                    { id: '10Q2i1khWdLoIY2QN9V7AC4VxaqxyLBSy', label: 'SET 6' },
                    { id: '1GlAZR6vt2iIlGDWesNHPPalbrSgVLAHQ', label: 'SET 7' },
                    { id: '1pmK2jNvWg64rL9tN5MbClH1oUvqWoz70', label: 'SET 8' },
                    { id: '1CjpJEK-01xWa1nlPZiXHMTlPolVGctXv', label: 'SET 9' },
                    { id: '1WtCM54VeEkH9444FqSor-nufusiVKFPb', label: 'SET 10' },
                ],
            }}
        />
    );
}

import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks/2015';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '18dFP-c0qpdAGRuuEFiKXz-Sg-givmyvU', label: 'Tigania' },
                    { id: '115BV0CZZ5KD7gOcpuUKE-96068dk1WWx', label: 'Sunshine' },
                    { id: '1UvmZDBcxd6r6gHWx0o0uAhe5ih5Y8s8G', label: 'Physics Mocks D' },
                    { id: '16y-eEJcUyBSN5dw92JNe9Rc_FsKnytX7', label: 'Physics Mocks B' },
                    { id: '1VUj_SN23vIrNfO1ugW3HVUgdQ_YThH-0', label: 'Nakuru-Laikipia' },
                    { id: '14viS_OVXaAFi4fOcugGhj31q0CR51hvq', label: 'Mokasa' },
                    { id: '1p4Z0yATSiOdZHBhE_HkNCJTgDbbQdXxx', label: 'Mathematics Mocks' },
                    { id: '1FShC6_bJS0pFP0oxi-RSigLVxpitVfEv', label: 'Kiswahili Mocks' },
                    { id: '1sdkMaelzSC2HRgWXqeMIIUFFJDZ-T1L_', label: 'Kabondo' },
                    { id: '1bIK5mY_Zns05jM6drZUiJoKPe9sUQDTZ', label: 'History Mocks' },
                    { id: '1btxkvKyr5_zpXg_k-r9XtDF8MozAAx4_', label: 'Geography Mocks' },
                    { id: '1PDuQZ6FmmqfEASCyu37_4oPHeiyxOmNt', label: 'English Mocks' },
                    { id: '1mqin2jlfb8Guur3sciD4XuyfZLmeWbMe', label: 'Central Kenya' },
                    { id: '1IbPELbKut7TpKqeGL_UtnwRNCSBJOaX3', label: 'Bondo' },
                    { id: '1JPN6kKjB3OGshUssY22nqUPutAKvjur0', label: 'Agriculture' },
                ],
            }}
        />
    );
}

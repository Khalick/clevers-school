import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/form1234-notes/form4';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1fxaKAEaNYy55IJBcRss9GyGsklzfdR07', label: 'Physics' },
                    { id: '15g6N6rI8FNeWbSTvYQuMqzXsIU574kmv', label: 'Maths' },
                    { id: '1HrkZY5zH3i7wkXykytBDd8PZR4MCe-AG', label: 'Kiswahili' },
                    { id: '1o-XxmAXZr30GTTYyO9wdIPpJxb3pLF71', label: 'IRE' },
                    { id: '1xdH_-XMcSbo7pVBMBjRlOJaish5t2XF1', label: 'Home Science' },
                    { id: '18BOBrslFtyAb5O0KUuU2Hk4QPEqj3m83', label: 'History' },
                    { id: '1OyXvLF7-aifc4ZM_u3uXzCW7bSxPtATR', label: 'Geography' },
                    { id: '1d2VggoBJLN1ngJaqGQZKHvYDSdBmbpAG', label: 'English' },
                    { id: '1iRLDY6ZaOFWOLdw3fCYWjne6s2LoWH1m', label: 'Computer Science' },
                    { id: '1CjAo_0YpZJpYmf1UmSNDWbqu6vcZIWRZ', label: 'Chemistry' },
                    { id: '1aTLAeEtWJOSM-xmtoMopazROEEMJ9lp_', label: 'CRE' },
                    { id: '1fO1QBiAMPbEIvMbVV3F9XXieJRJnjauG', label: 'Business' },
                    { id: '1EITJgGe6ZEcYE0oD4Vjtod4_NFYbcd0B', label: 'Biology' },
                    { id: '12P6c_Mkvw6PvyXFa2qyAjh-GoI8B_0XM', label: 'Agriculture' },
                ],
            }}
        />
    );
}

import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/igcse/cambridge/A-Level';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-lazy',
                folders: [
                    { id: '1G3v_bXhZIgA8kIDUGr3gmcFDVTZ6MdzA', label: 'Travel & Tourism' },
                    { id: '1xv8jLfvNGlre6PD0yG6WFkyKLXui-X-m', label: 'Psychology' },
                    { id: '1H8DFpGIjprFy485-CF79F60H0C6xWnb6', label: 'Physics' },
                    { id: '1ihSa8AHv91sNXaTN-V7GSigi97DgIbvV', label: 'Music' },
                    { id: '1yG0AIRJ42_4Akz8quuA7pOiWCnVpQDjC', label: 'History' },
                    { id: '1_0AM7lzBue7p3oP3Bie1A0LqoCXnpoII', label: 'Geography' },
                    { id: '1tWagwDVRRnLPF5SeN9YXkPqkdRDZjVY3', label: 'French' },
                    { id: '1J7wPLUWPIhfQQ1fIceYZZAVlOVgNmo8c', label: 'English' },
                    { id: '1WF1YvoLwR_G0S6bej7mvu7laiz7G11JW', label: 'Computing' },
                    { id: '10FVco3cSLQQjm0dQXmZorq-OMpxREjkV', label: 'Computer Science' },
                    { id: '1xTVqRBt_GSMW1aJRsqG0Pa-bPot7LEgC', label: 'Chemistry' },
                    { id: '1H6UzyzrQ3SBaCF-fWwoTZA1PiRkvRVOU', label: 'Business' },
                    { id: '1pcL5mEugtN5fVURQpkaFyf8XBejenXDQ', label: 'Biology' },
                    { id: '12pi98RV5-I2fzksMbqNCHLjdBo8lkSNp', label: 'Art & Design' },
                    { id: '1HA0rvSJN2I0c1wYTQpZAh74S0teL1kCI', label: 'Accounting' },
                ],
            }}
        />
    );
}

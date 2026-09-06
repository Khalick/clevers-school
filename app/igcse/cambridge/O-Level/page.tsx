import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/igcse/cambridge/O-Level';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-lazy',
                folders: [
                    { id: '1R1j5M49g8Gu3NZCjA8Vdjngxbd-rcU9i', label: 'Travel & Tourism' },
                    { id: '1QpSpejNKTSASm8yRcsFrlUDP6oz3R6Qv', label: 'Psychology' },
                    { id: '1wwqn6owGk6CblgFDeOeC4aOp-shqQZcD', label: 'Physics' },
                    { id: '1M4T_hN2M9yQlYOP2OhjpYatcegpEp13S', label: 'Music' },
                    { id: '1WFxKtiJZep6U7y7NLDCp0CcJaK5KEe3B', label: 'Mathematics' },
                    { id: '1ghELFOvVOlXMPh4WAyDiic8E7F-I1tj1', label: 'History' },
                    { id: '17GtQfHsLNEwnb-B0YkUSlxTHb-qcrnNQ', label: 'Geography' },
                    { id: '1ZowiQ_E9shnLi9WwtefJadA1yb1z9nBM', label: 'French' },
                    { id: '1wMmHzm_MB9EzZ4Y2Ea9sncdCd5I-e5kN', label: 'English' },
                    { id: '19-0SDyohKBoNrg6iDdnOzA_07mQQ9qKS', label: 'Computing' },
                    { id: '1NGoMD_gadhfEtdP-5BH8mzrMNElqcffS', label: 'Computer Science' },
                    { id: '113p7H9X3JEtO9lA_ZmgDDEM9Z8ut622S', label: 'Chemistry' },
                    { id: '17_hUXFeVBIV7wiiyRkuddpZgTjc-Etzq', label: 'Business' },
                    { id: '1dq4W4lNI18nI6TPO8qjhDdFWIkYeHq7L', label: 'Biology' },
                    { id: '1FtDbAxRRUjSwiGE2S5HOY_4YlZ-g-xMU', label: 'Art & Design' },
                    { id: '1_Q3PMd5mYEJD66kzeUsw1SVZMswdwjC8', label: 'Accounting' },
                ],
            }}
        />
    );
}

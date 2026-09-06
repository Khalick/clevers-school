import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/igcse/edexcel/GCSE';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-lazy',
                folders: [
                    { id: '1vMU-8PSKBnVbgkC023gZUlPQyldtQCwM', label: 'English Literature' },
                    { id: '1B9KuseVQqnW4j6vm_IiHlPrISdSdeuN3', label: 'Religious Studies' },
                    { id: '19d0p-RxP0k98d94bIy-g-kMNcHFTPk_R', label: 'Physics' },
                    { id: '1vf7CH6QuyLLiPDIWgMOIocHGmaYa1Ko0', label: 'Swahili' },
                    { id: '1WFxKtiJZep6U7y7NLDCp0CcJaK5KEe3B', label: 'Mathematics' },
                    { id: '17K6ReHDHXmLxBhjxSTq8PjvHQ6Xe75zX', label: 'History' },
                    { id: '1TDZfd9IGw1V8memtL0r35uPUbLHM-c4t', label: 'Geography' },
                    { id: '1HXNeRX7ejGlWhwCNkRG2TzvIBUREbfh2', label: 'French' },
                    { id: '1qJAsCCXdHR9LpG9c3bLcLyMKuMOlVXHk', label: 'English' },
                    { id: '19-0SDyohKBoNrg6iDdnOzA_07mQQ9qKS', label: 'Computing' },
                    { id: '1oLs52-Eo2Zf428u2FYZ-NBdXJyz8RG2Z', label: 'Computer Science' },
                    { id: '171eYmchh5wTDJKQOqefaoQygeAZGDWEH', label: 'Chemistry' },
                    { id: '1mt5kRi7muQ4jhJ3LX-carARhuWdyFW2l', label: 'Business' },
                    { id: '1cB-9SVH-opS18oCjeJhkskv7f_siiIZR', label: 'Economics' },
                    { id: '1T48xs3UJlNAf_mgDxtXwG7nYoYrd7LV2', label: 'Art & Design' },
                    { id: '1x-fVUFjHSEPBr2xsvb-fTWmkLiH2lW5C', label: 'Accounting' },
                ],
            }}
        />
    );
}

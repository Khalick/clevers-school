import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade123456Revision/exams/grade4';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1dIApPhnt-2yfUwDOOocoMR8vT-OaSNVN', label: 'SET 1' },
                    { id: '1lWJXp9JH7St8YhMIfykKXF_sWVogjQ0E', label: 'SET 2' },
                    { id: '1ShsO29cZRlNWqhcpPmPN17n0nFkC9IUw', label: 'SET 3' },
                    { id: '1OJSp48OIfmzCSuyg5sbLA1gHJvnplcS6', label: 'SET 4' },
                    { id: '1J-KPmCoVfw3Ej8hjyNM0VjQcGotmgP5x', label: 'SET 5' },
                    { id: '1bOTH3zEgIaj4KTUb3ZA5Vh_7rwVw9zz_', label: 'SET 6' },
                    { id: '10DUoZGk273-HUD4AwtWFAT6ERq6tlO9r', label: 'SET 7' },
                    { id: '1LAwLH1ctbf0rckg4c2M_hf1ucbDKmBA_', label: 'SET 8' },
                    { id: '1TecYruIyM118bFSVdpNxfJlcsZrv4cJF', label: 'SET 9' },
                    { id: '1vwm8HjNYlaeWH_A59myYX6deLOtnNPZz', label: 'SET 10' },
                    { id: '1oADgolFotSzQATKIhRaR7g90atH7o5A1', label: 'SET 11' },
                ],
            }}
        />
    );
}

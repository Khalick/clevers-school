import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade123456Revision/exams/grade3';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1u3ZuXud61HKGbDpc_BrkLnA3hiIlFLGa', label: 'SET 1' },
                    { id: '14g5lZba25j7OqQs9R4IS4M4tKBEZm-8l', label: 'SET 2' },
                    { id: '1LVXxFSaOfJ4D5kbC6SBwWadrJgTmsb4d', label: 'SET 3' },
                    { id: '1Ne-iAXInjAJ3eKBgS7Dl7c_rhkU9hgLE', label: 'SET 4' },
                    { id: '1yOo08BaMGsCjcw-7-XajJ6FB0sFdRLjx', label: 'SET 5' },
                    { id: '1J-jty_uOmYQgGqmp60wTeqSsZ-yztbKk', label: 'SET 6' },
                    { id: '16ucvhw9WWMkp2PmFjjfdFGYyOERgraN7', label: 'SET 7' },
                    { id: '1wp0wZ2UJq5KoM678Jlu4KKM1ImQ4exsa', label: 'SET 8' },
                    { id: '1ICMvAxaT_KE9N8Z235LNUdkBydqkUq0Q', label: 'SET 9' },
                    { id: '1XjODuyAvEQIqhyL-7uOghtxj2W7zWgNr', label: 'SET 10' },
                    { id: '1l3Adew5h_nauaLDDBKXHQLfXDRvMxhMV', label: 'SET 11' },
                    { id: '1DLxpQ7u79B0D5ZJ7bhjRyRjVTR_EdiQF', label: 'SET 12' },
                ],
            }}
        />
    );
}

import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade1to6Resources/curriculum';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '15D59iBDUxICxMMELmFrqwjHDB3-auqku', label: 'Grade 1' },
                    { id: '1RUnNA3DDwov14FSF0g-ochaK6qynKaB_', label: 'Grade 2' },
                    { id: '14gI97maiinYTly_Co1JCN29k6w4GVYDC', label: 'Grade 3' },
                    { id: '15VF7ZsbybBroOJtC2lJE3tywhOKAmQc8', label: 'Grade 4' },
                    { id: '1-blTzAqexcAdDfGAFDF0vcyTdGqZOXKa', label: 'Grade 6' },
                    { id: '1wR8yw2mxqhqyzLalS3v85z6aa5sjFuXo', label: 'Grade 7' },
                    { id: '1tfNwaf5KMnLzgwxGOqBZl9tT2qnPGI6R', label: 'Grade 8' },
                ],
            }}
        />
    );
}

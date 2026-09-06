import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks/2011';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1_nvgbVeJcBY07NmYrI_Y2AZbAXPfOp8t', label: 'Transmara' },
                    { id: '1TNquA46HHDA4JHWGJ6yi0k69Ww4XtN26', label: 'Thika' },
                    { id: '1D8NEyD5Cyw8jB-0O0AjwmYT9tVW6u6TO', label: 'Ndhiwa' },
                    { id: '1-tC77qLodnq1H7WrWqzvAqJddOt3qvE4', label: 'Nakuru' },
                    { id: '1dRxsRez1W_1ZdriUITisVUMk50Epa7N4', label: 'Mutumo' },
                    { id: '1A7639vaFKjpYXfHzTMXxcDiAp0So1Rs6', label: 'Matungu' },
                    { id: '1OsHRiwtXwyMoofLzzpbuW5wHxzQ1eltT', label: 'Masinga' },
                    { id: '1BlSE9WEa54jpSVjSj3cgJ3NKfFtbABbe', label: 'Machakos' },
                    { id: '1BpyEe2Gj7uyXCW2LFER0HX0MP0A7eYvo', label: 'Kitui West' },
                    { id: '1udoSbjFjT_-9ftoutWHCixVW2lsIAZXY', label: 'Kakamega' },
                ],
            }}
        />
    );
}

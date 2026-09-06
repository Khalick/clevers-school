import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks/2019';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1NVe7-gLW2_LdCVZ1tMTnXLBbO5gQ2FhR', label: 'Cekana' },
                    { id: '1LGWLoafgRLcINMngzCmXO9GSDDS0Z1oE', label: 'Chania' },
                    { id: '1Kpz0Hpkj2kgA5JOyGkWbYYfm5kwkeaRu', label: 'Kakamega' },
                    { id: '1VrFXIBz07ZIf5ACz6rrsFnYRf2j5OcFF', label: 'Kandara' },
                    { id: '1YGkeUKP_IMQET8JmcCFUnRhYxBl8TAf_', label: 'kAPSABET' },
                    { id: '1CTSlYJ-poXw5YKnctlRgAgP86Wtg0ks4', label: 'Kassu Jet' },
                    { id: '1cdK_hZWEIL8tgjiqRrz29haX3QJEev3C', label: 'KCSE Revision' },
                    { id: '11EjfXnnQnBrJD65bsDhmWYxHw8FJxZn8', label: 'KCSE Trial' },
                    { id: '1BPIYTWLmAbiQWTClmOSdhl3Gq_BfwyMZ', label: 'Kirinyaga' },
                    { id: '1VbYKa45hf-jIm_Y-7tw3IKLS_hxTUgme', label: 'Lainaku Joint' },
                    { id: '1CzN6rSfgMdkmbqSjp5qThlNk9aeM-g26', label: 'Lainaku 2' },
                    { id: '1dVqKLTUX150UtnP2RQOHEwz2PHkePHvu', label: 'Mau Link' },
                    { id: '1XewuP11i-ifq9FX8pcrnc1pdQq6RiHVj', label: 'Mokasa Past Papers' },
                    { id: '1mpUhcDJkqE6VWfOJ69DSh3GLY58jeD_l', label: 'Mokasa Pre-Mock' },
                    { id: '1cid3GZBHlH5RmVdtbf3QzH6kz4yho5Z2', label: 'Momaliche Mocks July' },
                    { id: '1YkfEbsALM4qkSLdjpOlUls9PMI6HoC6L', label: 'Momaliche Mocks' },
                    { id: '1qoUTyXTEFlOLyzFT8BFECGY5z5pD2tGo', label: 'Pangani Girls' },
                    { id: '1ydzLwWB7IMBD8oGmENJb3nk5cjaB5FP4', label: 'Pioneer' },
                    { id: '1T-WWxh-tyPpFhzT1I6T5rB1aA0yx2fAy', label: 'Sukellemo Joint' },
                    { id: '1pQB4kNvKo4MHekAuk011WJJHUtHn9Lym', label: 'Sunshine' },
                    { id: '1N4SkeS7mF6scEQ-4Ty35ozohhi0YQdB0', label: 'Top Skills' },
                    { id: '1wWkbyS4bImcyFInUyAemnesiIQYQ80jO', label: 'Trial 1' },
                    { id: '1cDOodUU4IOEEV0NF9fGP52iYtgRiyVn8', label: 'Trial 5' },
                    { id: '1sHsb-5SM1beU_bfNuHYyc2kXBcgmUH14', label: 'Trial 6' },
                    { id: '12pkR1XkSMgfkN8gNUKXQTSmM5E-iOEAs', label: 'Trial 8' },
                ],
            }}
        />
    );
}

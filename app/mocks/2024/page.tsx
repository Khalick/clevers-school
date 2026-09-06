import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks/2024';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1ETfLmygQl1truGlkBYJW0spCuNdmi91F', label: '2024 ACK JOINT MOCK MUMIAS' },
                    { id: '13pgpKwj2hotyE0k-4GGWhebZ6A-l75w3', label: '2024 BSJE{Bondo sub county joint) JOINT EXAMINATION QUESTIONS' },
                    { id: '1y-MSLsjYkuNVGG1kgfEPKgLz-8FKtgQD', label: 'STAREHE GIRLS CENTRE MOCK EXAMINATION 2024' },
                    { id: '1ZoJuvbgX4QQgoPf2qVbQ8vM4LJajy5RA', label: 'MUSJET EXAMINATION 2024' },
                    { id: '1nly_NoVnTZIQMztDUP2SagvULsmWqTkF', label: 'Muranga south kcse 2024 mock' },
                    { id: '1yZSa_FVR8vn0SnLm9noun0ozKFwjtS62', label: 'MOKASA II JOINT MOCK 2024' },
                    { id: '1xE9dr4wPIikI-OH0y6pBr6lGi0JTYYtN', label: 'moi high kabarak post mock KCSE 2024' },
                    { id: '1OO6v6DCgDAa2mlV58BgtX6sopX14q-ji', label: 'MOI GIRLS HIGH SCHOOL' },
                    { id: '1tOZUeLM8_ef9WmiqXEmt5-a_T_ZqZrLj', label: 'MATUNGU SUB COUNTY JOINT EXAM SEPTEMBER 2024' },
                    { id: '1lYscN7U-TZ41nwohj7dvTEinIUSwC0kZ', label: 'MASENO HIGH KCSE QUESTION AND ANSWERS' },
                    { id: '1wGZ69nxtr8t2_LrxylGE9xKwEAfioNnm', label: 'MARANDA PRE-MOCK FULL EXAM' },
                    { id: '1zDvQ6i1-leVRqbgI43RVY5r_tFDtUdG1', label: 'LORETO,LIMURU & MARANDA JOINT MOCK 2024' },
                    { id: '1qpOpVUU0TIo6lJ6qoCL1pD8nm8pJA11G', label: 'KENYA HIGH REVISION MOCK' },
                    { id: '11s-ixWSp8c8XuA1ToPSd-UHIhtjKuV51', label: 'KCSE BOKAKE JOINT MOCK' },
                    { id: '1t2bQK9cphr0umQq_i9OHLsHhHPKG7U4l', label: 'KCSE 2024 KISII HIGH REVISION MOCK' },
                    { id: '1zWOYmmuGjzrtvYDafJ_TZrq0lp9bubnn', label: 'KASSU JET JOINT MOCK 2024' },
                    { id: '1kiZP2GX4PuCUvwOu2uLGhJuWXvBJstar', label: 'KALA JOINT TRIAL EXAMINATION JULY/AUG 2024' },
                    { id: '17GXv77EEjnZMPmLKmt-Sapgz4ANhmbXm', label: 'KABIANGA HIGH KCSE 2024 MOCK' },
                    { id: '1xCV2Z0SeRbhYw2CLPz2HcXtjFqoi9uxB', label: 'CHAMPIONS JET**INCOMPLETE' },
                    { id: '1LPz68Ex9jx-d1EfARjiJJQuiOO95gYes', label: 'BUKAKA CLUSTER EXAMINATION 2024' },
                    { id: '1f6nJ4FX3DdijcwrPfS0zNk5JET6rMMlF', label: '2024 NAKURU JOINT MOCK REVISION PAPERS' },
                    { id: '1aydeK_mXeDNW2M27qTpb-ol0akYiNACr', label: '2024 KCSE PANGANI GIRLS REVISION MOCK' },
                    { id: '1vT_l4XjBEfN5FPT-am6rAFAicxjsKaKY', label: '2024 CEKANA REVISION MOCK QUESTION AND ANSWERS' },
                ],
            }}
        />
    );
}

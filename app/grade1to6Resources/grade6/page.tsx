import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade1to6Resources/grade6';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1s8II4N3wDCZZLhNXxJZQ86gpnEdd_sfw', label: 'Assessments' },
                    { id: '14AGTgwJ8VYoOMBmX10A3kHZpGQkt7ZgW', label: 'Assignments' },
                    { id: '1-blTzAqexcAdDfGAFDF0vcyTdGqZOXKa', label: 'Curriculum Designs' },
                    { id: '1Wi8oUKsNR-Tbv4ld2_VwIFWGGN5PIMjl', label: 'Exams' },
                    { id: '1GYkSXZ8f9Rg0BU0Fxk8yjCrO1rBMeYAE', label: 'Lesson Plans' },
                    { id: '17iqNr7dscgyXyZYDsP2_DBU_HNrxPIE8', label: 'Notes' },
                    { id: '1GKvtQJ1x39RQc3b5JOexGFCPrd-5csYI', label: 'Schemes of Work' },
                    { id: '1V9yG7WDlm7FAmvHIx6cECfKNFikAWaFn', label: '2022 KEPSEA' },
                ],
            }}
        />
    );
}

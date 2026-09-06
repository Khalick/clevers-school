import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/grade123456Revision/exams/grade1';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '192izacZa-odg1f1S9O8Cvvifqetx_FLc', label: 'SET 1' },
                    { id: '1U1zPuS8ko5zJyWIWcTiP8uTQAB1XBb5b', label: 'SET 2' },
                    { id: '1BXX9relJKujOQJg_TnzD5HlINCLOV5sJ', label: 'SET 3' },
                    { id: '1X3087xCDVGKBtDRGfKodayZZFpLKSirT', label: 'SET 4' },
                    { id: '1Wx-eq2uahknFzF5CbQaAenSjY7V-guei', label: 'SET 5' },
                    { id: '1hktJQZe2P8UUpC-ndscYzep9YuSYJsYe', label: 'SET 6' },
                    { id: '1zL2Y0rjkDu2wGeGKnI-W5ULzuDf37gvi', label: 'SET 7' },
                    { id: '1L0fMWl-mjaRHV-dmiQN5Xs-FmEJNr6p-', label: 'SET 8' },
                    { id: '19qsNtQGdlvGmf8_SqMnO1tN3TsJSe1HL', label: 'SET 9' },
                    { id: '1qbBnDbZ7tswKExR7VLrbi8oKR5spOcB2', label: 'SET 10' },
                ],
            }}
        />
    );
}

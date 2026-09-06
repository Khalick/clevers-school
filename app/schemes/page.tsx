import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/schemes';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1-9lpvL8h_mrDTlJguDo0_dRlpXYE5MVh', label: 'PP1 Schemes of Work' },
                    { id: '1yAqTm4d7zBQwMr0fUBVscdnLTsxtjokc', label: 'PP2 Schemes of Work' },
                    { id: '1jlzgR5FLUkgWeuHoa7kjMWt9LJ6GdaSP', label: 'Grade 8 Schemes of Work' },
                    { id: '1rmDCI2N2jjdgcWuAeP2ktJ-JoTg9KxpF', label: 'Grade 7 Schemes of Work' },
                    { id: '1NrDzVT1ANq7fA86GsMYfdPDoqM-qWBgH', label: 'Grade 6 Schemes of Work' },
                    { id: '1cVQAWlzT7khQCbBT2cAMqgRcgwvRIqLY', label: 'Grade 5 Schemes of Work' },
                    { id: '1f2l_PO475td92XpLZbSjwDqyO0MSczCG', label: 'Grade 4 Schemes of Work' },
                    { id: '1CxFlD59nLe2c61CYOCZ3S8Ffyxc5h8wz', label: 'Grade 3 Schemes of Work' },
                    { id: '1wEijOD4KDPR-VWVi36KenJUPxMqDn2nx', label: 'Grade 2 Schemes of Work' },
                    { id: '1_u16aPB6IZgPwL5grxS4_d2K4PeA1Fxh', label: 'Grade 1 Schemes of Work' },
                    { id: '1EGz6GMWGip1rjSXQpz5yInpDO6Ee2cCf', label: 'Form 4 Schemes of Work' },
                    { id: '1AfR2TjRmoh1QTr8qNFLBPatMyxLP_Mvz', label: 'Form 3 Schemes of Work' },
                    { id: '1DQXyXS8ELL2BE4w92fjz09lUPw5o7yxG', label: 'Form 2 Schemes of Work' },
                    { id: '14qXHfKCt2_2Cw8_a2O49Np_sYyOfUTdx', label: 'Form 1 Schemes of Work' },
                ],
            }}
        />
    );
}

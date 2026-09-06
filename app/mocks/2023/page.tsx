import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks/2023';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1CW2lckf7Er2A4Lk43InZqYi9Yog7Q8hL', label: 'WAHUNDURA MOCK' },
                    { id: '1Hd-01VB23db6Y6YiKhgvUpz_vBXacCu5', label: 'SUNRISE PRE MOCK' },
                    { id: '1eCED3eej6947FrrxQB5-U75vw5K-jMFt', label: 'SUKELLEMO JOINT PRE MOCK EXAMS' },
                    { id: '1paxuvoPlYRlrWuCEhwtLeN5Gv1qMrIDy', label: 'SAMIA JOINT MOCK' },
                    { id: '1MlkVARgFO3cJhtlGXqDe6_Ov4uOVcgoj', label: 'PANGANI MOCK' },
                    { id: '1mW9Y_MisNLOoisDsCPUx5eq15TkN3Itk', label: 'NYARIRA CLUSTER MOCK' },
                    { id: '1s5-cRv_JsSTQw5TnbK9Jz5jXfmQgUJ2C', label: 'NGINDARA GIRLS MOCK' },
                    { id: '13T97AmU7FEwIQG8T0Ff5He_8RJQLKYOf', label: 'MUMIAS WEST PRE MOCK EXAMS' },
                    { id: '1JyJIo0_xmoJ8qIZMc1blZ7aXpVaK8vIR', label: 'MOMALICHE 2 EXAMS PRE MOCK' },
                    { id: '11Q5HN9caQFyBVT7p1zth8W1BjK_tCJ7B', label: 'MOKASA MOCK REVISION EXAMS' },
                    { id: '1fd9zVjU81i7d7-lmzYacSpsWQJ40v6vR', label: 'MOKASA 2 MOCK' },
                    { id: '1zLTWcrQjKyn5cf8yyCTCj7s_zTozh2Kb', label: 'MECS CLUSTER JOINT MOCK EXAM' },
                    { id: '1ORBtkktIzppvsL7-lCa-yMBqV_ZcM_Xa', label: 'MARANDA HIGH SCHOOL MOCK' },
                    { id: '1J6lnRY_Um2TlJEIcwR8wOmABgQQgwAw5', label: 'MANGU HIGH REVISION MOCK' },
                    { id: '1czEbkAVKoU44cbIg40aOBmcDt0OgbYF8', label: 'LUGARI CONSTITUENCY MOCK 1' },
                    { id: '1owJeOk5jM4NIpbq3fY7cBuBNEeTdW-7x', label: 'LANJET EVALUATION MOCK' },
                    { id: '1wrCA4uTQE6BoT5oEOCWmYeq7UAYCnaSx', label: 'LAINAKU II FORM 4 JOINT MOCK' },
                    { id: '137bsYZQwUevKTrior9Mi5vjfl9EiL7Uh', label: 'KENYA HIGH POST MOCK' },
                    { id: '1o7OgK-Q9SpzeExJuhL_fF5o6CqJSCUph', label: 'KASSU MOCK' },
                    { id: '1IoO9uNZEo6BkMD65-6aDklQht1SDGtp-', label: 'KAPSABET INTERNAL TRIAL 1' },
                    { id: '1tZKDtYi_sdMrV1RHIPLniqAWjV3ZuuGo', label: 'KAPSABET BOYS POST MOCK' },
                    { id: '1UBq8VfiwnRiDnMTIdnUE6C8CaEAX8zW-', label: 'KAPSABET 2 MOCK' },
                    { id: '1uQ7uyVZWyPF1SiDJBEu2j80sSG-5aX3j', label: 'KALA MOCK' },
                    { id: '1WmIgv4_ZuanfS9KrKJ-8VfMGy2vqOJe_', label: 'IAINAKU REVISION MOCK' },
                    { id: '1LOBAbZePVtViUHcHRq9JwUtvvpbVhj69', label: 'CHOGORIA MURUGI ZONE PRE MOCK' },
                    { id: '1BOWygtiuFwmr5agAyCDsdG4f9Fe7n4k9', label: 'CEKANA MOCKS' },
                    { id: '13F7rjLjqF9xdgSRm5Gt5KZzByVw9ND96', label: 'CATHOLIC DIOCESE OK KAKAMEGA MOCK' },
                    { id: '1RkYlh2yuM0M61G5y67fA3vVFgYzmm_TG', label: 'BSJE JOINT MOCK' },
                    { id: '1cNG11XekvkaV866NV7gHs_Yt4YO7GRzT', label: 'ASUMBI PRE MOCK EXAMS' },
                    { id: '1KfzGArDZe1DRj25zvsLlW9j-LLkAkmLq', label: 'ARISE AND SHINE PRE MOCK' },
                    { id: '1UGInyDcCokdnvqjT6u0LC5ay7YoLasci', label: 'ACHIEVERS JOINT MOCK' },
                ],
            }}
        />
    );
}

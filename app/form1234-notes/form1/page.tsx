import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/form1234-notes/form1';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1F7H96FRxDZ_4DavvKthGAPAtO8f2drdK', label: 'Physics' },
                    { id: '1brQK0kdto2B0BMUOk1PuFchVsQIce9nM', label: 'Maths' },
                    { id: '1izW0AS9vd9OP-aZTLeLFRsXa0ZMqy0DX', label: 'Kiswahili' },
                    { id: '1UpNQ13_kctq5HBO73tKwDVhyvS2YsBbR', label: 'IRE' },
                    { id: '1xdH_-XMcSbo7pVBMBjRlOJaish5t2XF1', label: 'Home Science' },
                    { id: '1cYHQazWtIDQax1DEehpx1WcgKdirv8a5', label: 'History' },
                    { id: '1X6XzHtXgq6KgHb4boiCC_kQivzjSqW0V', label: 'Geography' },
                    { id: '1c5JtiZLjouoCn7s4kr4g40W-PYQXqwKJ', label: 'English' },
                    { id: '1n2l3XP6FsIrYi-k33kKKtk1tvTYoEJDK', label: 'Computer Science' },
                    { id: '1eFEKWWzjpbCdnmYivDw_gYVSYuJTM5xz', label: 'Chemistry' },
                    { id: '1Vhor3ZGpLzKkUYMwSnlhCIlKPUiVitnX', label: 'CRE' },
                    { id: '1IGidrkaIWLRWbrLXauYnC3dbCx0eqVIK', label: 'Business' },
                    { id: '1LJGHLcdxEn28EXJcGCXZzr-Bsd2BTMlC', label: 'Biology' },
                    { id: '1693n4QSOqP_64RVGm4m2feMa7Hu0aFBn', label: 'Agriculture' },
                ],
            }}
        />
    );
}

import type { Metadata } from 'next';

import ResourceBrowser from '@/components/resources/ResourceBrowser';
import { titleForPath } from '@/lib/navigation';

const ROUTE = '/mocks/2013';

export const metadata: Metadata = {
    title: `${titleForPath(ROUTE)} | Clevers Schools Resources`,
};

export default function Page() {
    return (
        <ResourceBrowser
            source={{
                kind: 'drive-multi',
                folders: [
                    { id: '1Ndjglv_utl4e_Xf5QuyVPEJByVLHr1ml', label: 'French' },
                    { id: '1XwQwuCVpU802-xCr7TJxoNguyVvfT1DY', label: 'English' },
                    { id: '1zdyM8T0NJtXR7GwyXBtyIgAkPSCpgGrA', label: 'CRE' },
                    { id: '1aVOGzHZ4eSs6Wd7FEQnAf6Sm7WTw8UTS', label: 'Computer Studies' },
                    { id: '1-AXdwKvJZVHVX3vhfKZtLnl1o1IIT5ha', label: 'Chemistry' },
                    { id: '1_uR7MKN16-6j860FoGPI9VT8tHvplYg-', label: 'Business' },
                    { id: '1g1ihwbyTPHGP-9Jqw8Oyc8661QURotEg', label: 'Biology' },
                    { id: '1FqdPNfMVjilfwpMLUs_ygQyLpdpWlCmr', label: 'Art & Design' },
                    { id: '1YaoUvcVuUeeNQxqrrZUw3HsEdnFBlXVu', label: 'Agriculture' },
                    { id: '1IeBDl-BZkkKFdx1bmGJhZ1bZ3QlOlLts', label: 'Physics' },
                    { id: '1nA0queeuxPf3h3Q6x3TQFUMTzPlwMLHW', label: 'Kiswahili' },
                    { id: '1kB_Bk8j9_ohfxRdmJMzqp7Hql3FRlvVH', label: 'Mathematics' },
                    { id: '1sTqxLIwO9uGWC0OTGVqdpBUgHw_SJiVS', label: 'Home Science' },
                    { id: '1SQkgSeFBKxsZLwpAUy3YejA4-ZHM8fGR', label: 'History' },
                    { id: '1xLpz4jboqlbqsubNi69Jfr4l-0mSlr3I', label: 'Geography' },
                ],
            }}
        />
    );
}

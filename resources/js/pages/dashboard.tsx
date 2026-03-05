import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard({ subscriptions }: any) {
    // Example counts
    const total = subscriptions?.length || 0;
    const active = subscriptions?.filter((sub: any) => sub.status === 'Active').length || 0;
    const pending = subscriptions?.filter((sub: any) => sub.status === 'Pending').length || 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Box 1: Total Subscriptions */}
                <div className="bg-purple-600 square shadow-md p-8 text-white text-center">
                    <h2 className="text-2xl font-bold">{total}</h2>
                    <p>Total Subscriptions</p>
                </div>

                {/* Box 2: Active Subscriptions */}
                <div className="bg-purple-600 square shadow-md p-8 text-white text-center">
                    <h2 className="text-2xl font-bold">{active}</h2>
                    <p>Active Subscriptions</p>
                </div>

                {/* Box 3: Pending Subscriptions */}
                <div className="bg-purple-600 square shadow-md p-8 text-white text-center">
                    <h2 className="text-2xl font-bold">{pending}</h2>
                    <p>Pending Subscriptions</p>
                </div>
            </div>
        </AppLayout>
    );
}
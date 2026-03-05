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
    // Logic for counts
    const total = subscriptions?.length || 0;
    const active = subscriptions?.filter((sub: any) => sub.status === 'Active').length || 0;
    const overdue = subscriptions?.filter((sub: any) => sub.status === 'Overdue').length || 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="p-6">
                <div className="mb-8">
                    <p className="text-gray-600"><b>Welcome to Subscription Tracker!</b></p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Box 1: Total Subscriptions - Blue */}
                    <div className="bg-[#749ce0] rounded-xl shadow-sm p-8 text-white min-h-[200px] flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold leading-tight">Total<br />Subscriptions</h2>
                        </div>
                        <p className="text-sm font-medium">{total} Total Subscriptions</p>
                    </div>

                    {/* Box 2: Active Subscriptions - Purple */}
                    <div className="bg-[#a855f7] rounded-xl shadow-sm p-8 text-white min-h-[200px] flex flex-col justify-between relative">
                        <div>
                            <h2 className="text-xl font-bold leading-tight">Active<br />Subscriptions</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium">{active} Active Subscriptions</p>
                            {/* Toggle Switch UI */}
                            <div className="w-10 h-5 bg-green-400 rounded-full relative">
                                <div className="absolute right-1 top-1 bg-white w-3 h-3 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Box 3: Overdue Subscriptions - Yellow/Gold */}
                    <div className="bg-[#eab308] rounded-xl shadow-sm p-8 text-white min-h-[200px] flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold leading-tight">Overdue<br />Subscriptions</h2>
                        </div>
                        <p className="text-sm font-medium">{overdue} Overdue Subscription</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ subscriptions }: any) {
    console.log('Subscriptions Prop:', subscriptions);

    const subsArray = Array.isArray(subscriptions) 
        ? subscriptions 
        : (subscriptions?.data || []);

    const totalCount = subscriptions?.total ?? subsArray.length;

    const activeCount = subsArray.filter((sub: any) => {
        const status = String(sub.status || '').toLowerCase().trim();
        return status === 'active';
    }).length;

    const overdueCount = subsArray.filter((sub: any) => {
        const status = String(sub.status || '').toLowerCase().trim();
        return status === 'overdue';
    }).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="p-6">
                <div className="mb-8">
                    <p className="text-gray-600"><b>Welcome to Subscription Tracker!</b></p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#749ce0] rounded-xl shadow-sm p-8 text-white min-h-[200px] flex flex-col justify-between">
                        <h2 className="text-xl font-bold leading-tight">Total<br />Subscriptions</h2>
                        <p className="text-sm font-medium">{totalCount} Total Subscriptions</p>
                    </div>

                    <div className="bg-[#a855f7] rounded-xl shadow-sm p-8 text-white min-h-[200px] flex flex-col justify-between relative">
                        <h2 className="text-xl font-bold leading-tight">Active<br />Subscriptions</h2>
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium">{activeCount} Active Subscriptions</p>
                            <div className="w-10 h-5 bg-green-400 rounded-full relative">
                                <div className="absolute right-1 top-1 bg-white w-3 h-3 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#eab308] rounded-xl shadow-sm p-8 text-white min-h-[200px] flex flex-col justify-between">
                        <h2 className="text-xl font-bold leading-tight">Overdue<br />Subscriptions</h2>
                        <p className="text-sm font-medium">{overdueCount} Overdue Subscriptions</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
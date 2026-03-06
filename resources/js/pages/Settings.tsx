import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Settings', href: '/settings' },
];

export default function Settings() {
    const { auth } = usePage().props as any;
    const user = auth.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />

            <div className="p-6 cemax-w-5xl mx-auto">
                <div className="bg-white border border-gray-400 rounded-[2.5rem] shadow-sm overflow-hidden min-h-[400px]">
                    <div className="p-12"> 
                        <h2 className="text-3xl text-center font-extrabold text-gray-900 mb-8">Account Settings</h2>
                        
                        <div className="space-y-8">
                            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-[2rem]">
                                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Logged in as</p>
                                    <p className="text-2xl font-black text-gray-900">{user.name}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase ml-1">Email Address</label>
                                    <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700 font-medium">
                                        {user.email}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase ml-1">Account ID</label>
                                    <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700 font-medium">
                                        #{user.id}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-100 flex justify-between items-center">
                                <p className="text-xs text-gray-400 font-medium">
                                    Member since {new Date(user.created_at).toLocaleDateString()}
                                </p>
                                <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-bold uppercase rounded-full">
                                    Active Account
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
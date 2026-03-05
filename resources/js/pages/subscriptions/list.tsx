import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Edit2, Trash2, Plus, CreditCard, Calendar, RefreshCw, Tag, Activity } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

// Declare global route function for TypeScript
declare function route(name?: string, params?: any): string;

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manage Subscriptions', href: '/subscriptions/list' },
];

export default function List({ subscriptions = [] }: { subscriptions: any[] }) {
    const { delete: destroy } = useForm();

    // Helper to prevent crash if route() isn't loaded yet
    const safeRoute = (name: string, params?: any) => {
        try {
            return route(name, params);
        } catch (e) {
            console.error("Ziggy route helper not found");
            return "#";
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this subscription permanently?')) {
            destroy(safeRoute('subscriptions.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Subscriptions" />
            
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Subscription List</h1>
                        <p className="text-gray-500 font-medium">Monitoring {subscriptions.length} recurring services.</p>
                    </div>
                    <Link 
                        href={safeRoute('subscriptions.create')} 
                        className="bg-black text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-sm"
                    >
                        <Plus size={18} /> Add Subscription
                    </Link>
                </div>

                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200">
                                    <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Service Provider</th>
                                    <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                                    <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Subscription Plan</th>
                                    <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                                    <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Billing Term</th>
                                    <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Subscription Date</th>
                                    <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Renewal Date</th>
                                    <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {subscriptions.length > 0 ? (
                                    subscriptions.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="p-5 text-sm font-bold text-gray-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                                                        <CreditCard size={16}/>
                                                    </div>
                                                    {sub.service_name}
                                                </div>
                                            </td>
                                            <td className="p-5 text-sm font-bold text-gray-900">{sub.price}</td>
                                            <td className="p-5 text-sm font-bold text-gray-900">{sub.plan_type}</td>
                                            <td className="p-5 text-sm font-bold text-gray-900">{sub.category}</td>
                                            <td className="p-5 text-sm font-bold text-gray-900">
                                                <div className="flex items-center gap-1"> {sub.billing_term}</div>
                                            </td>
                                            <td className="p-5 text-sm font-bold text-gray-700">{sub.subscription_date}</td>
                                            <td className="p-5 text-sm font-bold text-gray-700">
                                                <div className="flex items-center gap-1"> {sub.renewal_date}</div>
                                            </td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit ${
                                                    sub.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="p-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={safeRoute('subscriptions.edit', sub.id)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all"><Edit2 size={16}/></Link>
                                                    <button onClick={() => handleDelete(sub.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16}/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="p-20 text-center text-gray-400 font-medium">
                                            No subscriptions found. Click "Add Subscription" to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
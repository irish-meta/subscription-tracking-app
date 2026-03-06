import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Edit2, Trash2, Plus, Search, ChevronDown, CreditCard, Calendar, RefreshCw, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import type { BreadcrumbItem } from '@/types';
import { debounce } from 'lodash'; 

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manage Subscriptions', href: '/subscriptions/list' },
];

export default function List({ subscriptions, filters }: { subscriptions: any, filters: any }) {
    const { flash } = usePage().props as any;
    const { data: subsList, links, total, from, to } = subscriptions;
    const [showToast, setShowToast] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [perPage, setPerPage] = useState(filters.per_page || '10');
    const { delete: destroy, processing: isDeleting } = useForm();
    const formatDate = (dateString: string) => {
        if (!dateString) return '---';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const confirmDelete = () => {
        if (deleteId) {
            destroy(`/subscriptions/${deleteId}`, {
                onSuccess: () => {
                    setDeleteId(null);
                    setShowToast(true);
                },
            });
        }
    };

    const updateQuery = useCallback(
        debounce((searchQuery, entriesCount) => {
            router.get(
                '/subscriptions/list',
                { search: searchQuery, per_page: entriesCount },
                { preserveState: true, replace: true }
            );
        }, 300),
        []
    );

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        updateQuery(value, perPage);
    };

    const onPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPerPage(value);
        updateQuery(search, value);
    };

    useEffect(() => {
        if (flash?.success) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Subscriptions" />

            {showToast && flash?.success && (
                <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-right-full w-full max-w-sm">
                    <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-4 flex items-center gap-4">
                        <div className="bg-green-500/10 p-2.5 rounded-xl">
                            <CheckCircle2 className="text-green-600 w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900 leading-none">Success</p>
                            <p className="text-xs text-gray-500 mt-1.5 font-medium">{flash.success}</p>
                        </div>
                        <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-gray-600 p-1">
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            {deleteId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-red-50 p-4 rounded-full mb-4">
                                <AlertCircle className="text-red-600 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Delete Subscription?</h3>
                            <p className="text-gray-500 mt-2 text-sm">This action cannot be undone.</p>
                            <div className="grid grid-cols-2 gap-3 w-full mt-8">
                                <button onClick={() => setDeleteId(null)} className="py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={confirmDelete} disabled={isDeleting} className="py-3 px-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50">
                                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Subscription List</h1>
                        <p className="text-gray-500 font-medium">Monitoring {total} recurring services.</p>
                    </div>
                    <Link href="/subscriptions/create" className="bg-black text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-sm">
                        <Plus size={18} /> Add Subscription
                    </Link>
                </div>

                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 font-medium">Show</span>
                        <div className="relative">
                            <select value={perPage} onChange={onPerPageChange} className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-black/5">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <span className="text-sm text-gray-500 font-medium">entries</span>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search..." value={search} onChange={onSearchChange} className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-black/5" />
                    </div>
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
                                {subsList.length > 0 ? (
                                    subsList.map((sub: any) => (
                                        <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="p-5 text-sm font-bold text-gray-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-black transition-colors">
                                                        <CreditCard size={16}/>
                                                    </div>
                                                    {sub.service_name}
                                                </div>
                                            </td>
                                            <td className="p-5 text-sm font-bold text-gray-900">${sub.price}</td>
                                            <td className="p-5 text-sm font-bold text-gray-900">{sub.plan_type}</td>
                                            <td className="p-5 text-sm font-bold text-gray-900">{sub.category}</td>
                                            <td className="p-5 text-sm font-bold text-gray-900">
                                                <div className="flex items-center gap-1 uppercase text-[10px] text-gray-500 tracking-tighter">
                                                    <RefreshCw size={10} /> {sub.billing_term}
                                                </div>
                                            </td>
                                            <td className="p-5 text-sm font-bold text-gray-700">{formatDate(sub.subscription_date)}</td>
                                            <td className="p-5 text-sm font-bold text-gray-700">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={12} className="text-gray-300" /> {formatDate(sub.renewal_date)}
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit ${
                                                    sub.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {sub.status || 'Active'}
                                                </span>
                                            </td>
                                            <td className="p-5 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href={`/subscriptions/${sub.id}/edit`} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all">
                                                        <Edit2 size={16}/>
                                                    </Link>
                                                    <button onClick={() => setDeleteId(sub.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                        <Trash2 size={16}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="p-20 text-center text-gray-400 font-medium italic">
                                            No subscriptions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-500 font-medium">
                            Showing <span className="font-bold text-gray-900">{from || 0}</span> to <span className="font-bold text-gray-900">{to || 0}</span> of <span className="font-bold text-gray-900">{total}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {links.map((link: any, i: number) => (
                                <Link 
                                    key={i} 
                                    href={link.url || '#'} 
                                    dangerouslySetInnerHTML={{ __html: link.label }} 
                                    className={`px-4 py-2 text-sm font-bold rounded-xl border transition-all ${
                                        !link.url ? 'opacity-30 cursor-not-allowed bg-white text-gray-300' : 
                                        link.active ? 'bg-black text-white border-black shadow-sm scale-105' : 
                                        'bg-white text-gray-600 hover:bg-gray-100'
                                    }`} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { CreditCard, DollarSign, Tag, Award, Calendar, RefreshCcw, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { BreadcrumbItem } from '@/types';

interface Subscription {
    id: number;
    service_name: string;
    price: string | number;
    category: string;
    plan_type: string;
    billing_term: string;
    subscription_date: string;
    renewal_date: string;
}

export default function Edit({ subscription }: { subscription: Subscription }) {
    const { flash } = usePage().props as any;
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Edit Subscription', href: `/subscriptions/${subscription.id}/edit` },
    ];

    const formatDateForInput = (dateString: string) => {
        if (!dateString) return '';
        return dateString.split(' ')[0];
    };

    const { data, setData, put, processing, errors } = useForm({
        service_name: subscription.service_name || '',
        price: subscription.price || '',
        category: subscription.category || '',
        plan_type: subscription.plan_type || '',
        subscription_date: formatDateForInput(subscription.subscription_date),
        billing_term: subscription.billing_term || 'Monthly',
        renewal_date: formatDateForInput(subscription.renewal_date),
    });

    useEffect(() => {
        if (flash?.success) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    useEffect(() => {
        if (data.subscription_date && data.billing_term) {
            const date = new Date(data.subscription_date);
            switch (data.billing_term) {
                case 'Daily': date.setDate(date.getDate() + 1); break;
                case 'Weekly': date.setDate(date.getDate() + 7); break;
                case 'Monthly': date.setMonth(date.getMonth() + 1); break;
                case 'Quarterly': date.setMonth(date.getMonth() + 3); break;
                case 'Semi-annually': date.setMonth(date.getMonth() + 6); break;
                case 'Yearly': date.setFullYear(date.getFullYear() + 1); break;
            }
            setData('renewal_date', date.toISOString().split('T')[0]);
        }
    }, [data.subscription_date, data.billing_term]);

    const submitForm = () => {
        setShowSaveModal(false);
        put(`/subscriptions/${subscription.id}`, {
            preserveScroll: true,
            onFinish: () => setShowSaveModal(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${subscription.service_name}`} />

            {showToast && flash.success && (
                <div key={flash.success} className="fixed top-6 right-6 z-[100] animate-toast-right w-full max-w-sm">
                    <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-4 flex items-center gap-4">
                        <div className="bg-green-500/10 p-2.5 rounded-xl">
                            <CheckCircle2 className="text-green-600 w-5 h-5" />
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900 leading-none">Subscription Updated</p>
                            <p className="text-xs text-gray-500 mt-1.5 font-medium">{flash.success}</p>
                        </div>

                        <button
                            onClick={() => setShowToast(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            {showSaveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-blue-50 p-4 rounded-full mb-4">
                                <RefreshCcw className="text-blue-600 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Save Changes?</h3>
                            <p className="text-gray-500 mt-2 text-sm">Update details for <b>{data.service_name}</b>?</p>
                            <div className="grid grid-cols-2 gap-3 w-full mt-8">
                                <button type="button" onClick={() => setShowSaveModal(false)} className="py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200">Not yet</button>
                                <button type="button" onClick={submitForm} className="py-3 px-4 bg-black text-white font-bold rounded-2xl shadow-lg hover:bg-gray-800">Yes, Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-red-50 p-4 rounded-full mb-4">
                                <AlertCircle className="text-red-600 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Discard Edits?</h3>
                            <p className="text-gray-500 mt-2 text-sm">Your changes will not be saved.</p>
                            <div className="grid grid-cols-2 gap-3 w-full mt-8">
                                <button type="button" onClick={() => setShowCancelModal(false)} className="py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200">Go Back</button>
                                <Link href="/subscriptions/list" className="py-3 px-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg hover:bg-red-700 text-center">Discard</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-center p-6">
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 p-10 mt-8">
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">Edit Subscription</h2>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); setShowSaveModal(true); }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Service Provider</label>
                            <div className="relative">
                                <CreditCard className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <input type="text" value={data.service_name} onChange={e => setData('service_name', e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-gray-900" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Amount</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <input type="number" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-gray-900" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
                            <div className="relative">
                                <Tag className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <select value={data.category} onChange={e => setData('category', e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 appearance-none text-gray-900" required>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Productivity">Productivity</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Education">Education</option>
                                    <option value="Health & Fitness">Health & Fitness</option>
                                    <option value="Software/Dev">Software/Dev</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Subscription Plan</label>
                            <div className="relative">
                                <Award className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <select value={data.plan_type} onChange={e => setData('plan_type', e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 appearance-none text-gray-900" required>
                                    <option value="Basic">Basic</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Pro">Pro</option>
                                    <option value="Student">Student</option>
                                    <option value="Family">Family</option>
                                    <option value="Individual">Individual</option>
                                    <option value="Enterprise">Enterprise</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Billing Cycle</label>
                            <div className="relative">
                                <RefreshCcw className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <select value={data.billing_term} onChange={e => setData('billing_term', e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 appearance-none text-gray-900">
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Semi-annually">Semi-annually</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Start Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <input type="date" value={data.subscription_date} onChange={e => setData('subscription_date', e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-gray-900" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 text-blue-600">Next Renewal</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-3.5 text-blue-500 w-5 h-5" />
                                <input type="date" value={data.renewal_date} readOnly className="w-full pl-12 pr-4 py-3.5 bg-blue-50 border-none rounded-2xl text-blue-700 font-bold cursor-not-allowed" />
                            </div>
                        </div>

                        <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-6">
                            <button type="button" onClick={() => setShowCancelModal(true)} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-200">
                                <X size={18} /> Cancel
                            </button>
                            <button type="submit" disabled={processing} className="flex-[2] bg-black text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-800 disabled:opacity-50">
                                {processing ? 'Saving...' : 'Confirm Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
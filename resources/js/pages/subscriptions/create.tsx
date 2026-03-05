import AppLayout from '@/layouts/app-layout'; 
import { Head, useForm } from '@inertiajs/react';
import { CreditCard, DollarSign, Tag, Award, Calendar, RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Add Subscription', href: '/subscriptions/create' },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        service_name: '',
        price: '',
        category: '',
        plan_type: '', 
        subscription_date: new Date().toISOString().split('T')[0],
        billing_term: 'Monthly',
        renewal_date: '',
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/subscriptions'); // Using direct path to ensure connection
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Subscription" />
            <div className="flex items-center justify-center p-6">
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 p-10 mt-8">
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">Add Subscription</h2>
                        <p className="text-gray-500 mt-2">Set up and track your recurring services.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Service Provider</label>
                            <div className="relative">
                                <CreditCard className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <input type="text" value={data.service_name} onChange={e => setData('service_name', e.target.value)} placeholder="e.g., Netflix, Spotify, Canva" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-gray-900" required />
                            </div>
                            {errors.service_name && <p className="text-red-500 text-xs mt-1">{errors.service_name}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Amount</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <input type="number" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} placeholder="0.00" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-gray-900" required />
                            </div>
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
                            <div className="relative">
                                <Tag className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <select value={data.category} onChange={e => setData('category', e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 appearance-none text-gray-900" required>
                                    <option value="">Select category...</option>
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
                                    <option value="">Select plan...</option>
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

                        <button disabled={processing} className="md:col-span-2 w-full bg-black text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-800 transition-all mt-4 active:scale-[0.98] disabled:opacity-50">
                            {processing ? 'Saving...' : 'Confirm Subscription'}
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
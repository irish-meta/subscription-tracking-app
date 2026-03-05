import React from 'react';
import { useForm } from '@inertiajs/react';

export default function AddSubscriptionForm() {
    const { data, setData, post, processing } = useForm({
        full_name: '',
        service_name: '',
        price: '',
        billing_cycle: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/subscriptions', {
            onSuccess: () => {
                setData('full_name', '');
                setData('service_name', '');
                setData('price', '');
                setData('billing_cycle', '');
            },
        });
    }

    return (
        <div className="mb-8 p-4  rounded shadow-md text-white">
            <h2 className="text-xl font-bold mb-4">Add Subscription</h2>
            <form onSubmit={submit} className="space-y-4">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="border border-gray-400 p-2 rounded flex-1 bg-gray-700 text-white placeholder-gray-400"
                        value={data.full_name}
                        onChange={e => setData('full_name', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Service Name"
                        className="border border-gray-400 p-2 rounded flex-1 bg-gray-700 text-white placeholder-gray-400"
                        value={data.service_name}
                        onChange={e => setData('service_name', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        className="border border-gray-400 p-2 rounded flex-1 bg-gray-700 text-white placeholder-gray-400"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                    />
                    <select
                        className="border border-gray-400 p-2 rounded flex-1 bg-gray-700 text-white"
                        value={data.billing_cycle}
                        onChange={e => setData('billing_cycle', e.target.value)}
                    >
                        <option value="">Billing Cycle</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
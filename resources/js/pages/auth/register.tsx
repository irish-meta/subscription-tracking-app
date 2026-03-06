import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Create Account" />

            <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center p-6">
                
                <div className="w-full max-w-[600px] bg-white border border-gray-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                    <div className="flex-1 p-12 flex flex-col justify-center">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                Create account
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Join us to start tracking your subscriptions.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-2" htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`w-full p-4 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all`}
                                    placeholder="John Doe"
                                    required
                                    autoFocus
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full p-4 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all`}
                                    placeholder="name@email.com"
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`w-full p-4 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all`}
                                    placeholder="••••••••"
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-2" htmlFor="password_confirmation">
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className={`w-full p-4 bg-gray-50 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all`}
                                    placeholder="••••••••"
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="pt-4 space-y-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
                                >
                                    {processing ? "Creating account..." : "Create Account"}
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    Already have an account?{' '}
                                    <Link href="/login" className="font-bold text-black hover:underline">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                <p className="mt-8 text-sm text-gray-400">
                    © 2026 Subscription Tracker. All rights reserved.
                </p>
            </div>
        </>
    );
}
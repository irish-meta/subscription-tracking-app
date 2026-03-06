import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';

export default function Welcome() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center p-6">
               
                <div className="w-full max-w-[600px] bg-white border border-gray-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">

                    <div className="flex-1 p-12 flex flex-col justify-center">

                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                                SUBSCRIPTION TRACKER
                            </h2>
                            <p className="text-gray-500 mt-2 text-center">
                                Please enter your details to sign in.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">                          
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full p-4 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all`}
                                    placeholder="name@email.com"
                                    required
                                    autoComplete="username"
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                        
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-gray-400" htmlFor="password">
                                        Password
                                    </label>
                                    <Link href="/forgot-password"  className="text-xs text-gray-400 hover:text-black font-medium">
                                        Forgot password?
                                    </Link>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`w-full p-4 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all`}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    id="remember" 
                                    checked={data.remember} 
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-black focus:ring-black"
                                />
                                <label htmlFor="remember" className="text-xs font-bold text-gray-400 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <div className="pt-2 space-y-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? "Signing in..." : "Sign In"}
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    Don't have an account?{' '}
                                    <Link href="/register" className="font-bold text-black hover:underline">
                                        Registered
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
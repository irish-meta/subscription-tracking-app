import { Head, Link, useForm } from '@inertiajs/react';

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
            <Head title="Login" />

            <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center p-6">

                <div className="fixed top-0 w-full flex justify-end p-6 gap-4">
                    <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-black">
                        Log in
                    </Link>

                    <Link href="/register" className="text-sm font-bold bg-white border border-gray-200 px-4 py-1.5 rounded-lg shadow-sm hover:bg-gray-50">
                        Register
                    </Link>
                </div>

                <div className="w-full max-w-[900px] bg-white border border-gray-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">

                    <div className="flex-1 p-12 flex flex-col justify-center">

                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                Welcome back
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Please enter your details to sign in.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-black outline-none"
                                    placeholder="name@email.com"
                                    required
                                />

                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-2">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-black outline-none"
                                    placeholder="••••••••"
                                    required
                                />

                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-2">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-zinc-800"
                            >
                                {processing ? "Signing in..." : "Sign In"}
                            </button>

                        </form>
                    </div>

                    <div className="hidden md:block flex-1 bg-[#FFF5F5] relative border-l border-gray-100">

                        <div className="absolute inset-0 flex items-center justify-center">

                            <h1 className="text-[120px] font-black text-red-500/10">
                                SUB
                            </h1>

                        </div>

                        <div className="absolute bottom-10 left-10 right-10">
                            <p className="text-sm font-bold text-gray-900">
                                Manage your subscriptions seamlessly with our modern dashboard.
                            </p>
                        </div>

                    </div>

                </div>

                <p className="mt-8 text-sm text-gray-400">
                    © 2026 Subscription Tracker
                </p>

            </div>
        </>
    );
}
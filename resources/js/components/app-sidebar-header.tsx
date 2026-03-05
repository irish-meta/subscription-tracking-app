import { usePage, Link } from '@inertiajs/react';
import { User, ChevronDown } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import type { BreadcrumbItem } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItem[] }) {
    const { auth } = usePage().props as any;

    return (
        <header className="flex h-20 shrink-0 items-center justify-between px-8 bg-white border-b border-gray-100 transition-[width,height] ease-linear">
            {/* LEFT SIDE: Breadcrumbs */}
            <div className="flex items-center gap-2">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* RIGHT SIDE: User Profile & Dropdown */}
            <div className="flex items-center gap-3 cursor-pointer group relative">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-lg">
                        {auth.user?.name || 'User'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={20} className="text-gray-600" />
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                </div>

                {/* Dropdown Menu - Simplified to avoid route errors */}
                <div className="invisible group-hover:visible absolute top-full right-0 mt-1 bg-white shadow-xl border border-gray-100 rounded-md w-40 py-2 z-50">
                    <div className="px-4 py-1 text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                        Manage Account
                    </div>
                    
                    <Link 
                        href="/settings" 
                        className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                    >
                        Settings
                    </Link>

                    {/* Using hardcoded string path to prevent "route is not defined" */}
                    <Link 
                        href="/logout" 
                        method="post" 
                        as="button" 
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 text-sm font-bold transition-colors"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </header>
    );
}
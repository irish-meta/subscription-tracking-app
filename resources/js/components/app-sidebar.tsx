import { Link } from '@inertiajs/react';
import { LayoutGrid, PlusSquare, Bookmark } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Add Subscription',
        href: '/subscriptions/create',
        icon: PlusSquare,
    },
    {
        title: 'Manage Subscriptions',
        href: '/subscriptions/list', 
        icon: Bookmark,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-white border-r border-gray-100">
            {/* TOP LEFT: Branding Section */}
            <SidebarHeader className="p-6 pb-4"> 
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex flex-col items-start gap-3 px-2">
                            {/* NEW: Clean 'SUBSCRIBE' Pill Branding */}
                            <div className="bg-black rounded-full px-5 py-1.5 flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity cursor-default">
                                <span className="text-white font-extrabold text-[11px] tracking-[0.15em] uppercase leading-none">
                                    Subscribe
                                </span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* MIDDLE: Navigation items */}
            <SidebarContent className="pt-2"> 
                {/* Note: To remove the "Platform" text completely, you must 
                    open components/nav-main.tsx and delete the <SidebarGroupLabel> line.
                */}
                <NavMain items={mainNavItems} />
            </SidebarContent>
        </Sidebar>
    );
}
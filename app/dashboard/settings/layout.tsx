import { SidebarNav } from "@/components/dashboard/settings/sidebar-nav";
import { ReactNode } from "react";

const sidebarNavItems = [
    {
        title: "Project Settings",
        href: "/dashboard/settings",
    },
    {
        title: "Manage Teams",
        href: "/dashboard/settings/team",
    },
    {
        title: "Display",
        href: "/dashboard/settings/display",
    },
];

function SettingsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="space-y-6 p-4 pb-16">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}

export default SettingsLayout;

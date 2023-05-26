import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full">
                <Header />
                <section className="p-8">{children}</section>
            </div>
        </div>
    );
}

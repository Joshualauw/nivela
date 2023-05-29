import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/");

    return (
        <div className="flex">
            <Sidebar className="w-[300px] h-screen hidden lg:block" />
            <div className="w-full">
                <Navbar />
                <section className="p-8">{children}</section>
            </div>
        </div>
    );
}

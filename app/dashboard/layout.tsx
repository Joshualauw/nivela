import Navbar from "@/components/dashboard/navbar";
import DashboardParams from "@/components/dashboard/params";
import Sidebar from "@/components/dashboard/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
            <DashboardParams userId={session.user.id} />
            <div className="w-full">
                <Navbar />
                <ScrollArea className="h-screen p-8 pb-24">{children}</ScrollArea>
            </div>
        </div>
    );
}

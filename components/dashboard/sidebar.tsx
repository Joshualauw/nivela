"use client";

import { User, Mountain, Settings, LayoutDashboard, BookTemplate, Pencil, Boxes } from "lucide-react";
import { cloneElement } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { ProjectCombobox } from "./projects";
import { useTitleStore } from "@/hooks/store/useTitleStore";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useProjectStore } from "@/hooks/store/useProjectStore";

const categories = [
    {
        name: "Characters",
        icon: <User />,
    },
    {
        name: "Places",
        icon: <Mountain />,
    },
];

const settings = [
    {
        name: "Overview",
        icon: <LayoutDashboard />,
    },
    {
        name: "Chapters",
        icon: <Pencil />,
    },
    {
        name: "Templates",
        icon: <BookTemplate />,
    },
    {
        name: "Categories",
        icon: <Boxes />,
    },
    {
        name: "Settings",
        icon: <Settings />,
    },
];

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    const router = useRouter();
    const { title, setTitle } = useTitleStore();
    const { projectDetail } = useProjectStore();

    return (
        <div className={className + " bg-gray-900 text-gray-100"}>
            <div className="space-y-4 px-5 py-2 mt-6 h-full relative">
                <div className="px-2 py-1">
                    <h2 className="px-2 text-xl font-bold items-center tracking-wide flex">
                        <Image src="/img/write.svg" alt="dashboard_logo" height="22" width="22" className="mr-3" />
                        <span className="tracking-wider">Nivela.com</span>
                    </h2>
                    <h3 className="mb-8 px-2 text-gray-400">Unleash your creation</h3>
                    <div className="space-y-2 mb-8">
                        {settings.map((set) => (
                            <Button
                                key={set.name}
                                onClick={() => {
                                    setTitle(set.name.toLowerCase());
                                    router.push(`/dashboard/${set.name.toLowerCase()}?projectId=${projectDetail?.id}`);
                                }}
                                variant={title === set.name.toLowerCase() ? "secondary" : "ghost"}
                                className="w-full justify-start"
                            >
                                {cloneElement(set.icon, { className: "mr-4 h-4 w-4" })}
                                {set.name}
                            </Button>
                        ))}
                    </div>
                    <h2 className="mb-5">All Categories</h2>
                    <ScrollArea className="mt-5 h-[225px]">
                        {categories.map((cat) => (
                            <Button
                                key={cat.name}
                                onClick={() => {
                                    setTitle(cat.name.toLowerCase());
                                    router.push(
                                        `/dashboard/category/${cat.name.toLowerCase()}?projectId=${projectDetail?.id}`
                                    );
                                }}
                                variant={title === cat.name.toLowerCase() ? "secondary" : "ghost"}
                                className="w-full mb-1 justify-start"
                            >
                                {cloneElement(cat.icon, { className: "mr-4 h-4 w-4" })}
                                {cat.name}
                            </Button>
                        ))}
                    </ScrollArea>
                    <ProjectCombobox />
                </div>
            </div>
        </div>
    );
}

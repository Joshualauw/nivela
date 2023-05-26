"use client";

import { User, Mountain, Settings } from "lucide-react";
import { cloneElement } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { ProjectCombobox } from "./projects";
import { useTitleStore } from "@/store/useTitleStore";

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

export default function Sidebar() {
    const router = useRouter();
    const { title } = useTitleStore();

    return (
        <div className=" w-[300px] h-screen hidden lg:block bg-gray-900 text-gray-100">
            <ScrollArea className="space-y-4 px-5 py-2 h-full">
                <div className="px-2 py-1">
                    <h2 className="px-2 text-xl font-bold items-center tracking-wide flex">Nivela Dashboard</h2>
                    <h3 className="mb-12 px-2 text-gray-400">Unleash your creation</h3>
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <Button
                                key={cat.name}
                                onClick={() => router.push(`/dashboard/${cat.name.toLowerCase()}`)}
                                variant={title === cat.name.toLowerCase() ? "secondary" : "ghost"}
                                className="w-full justify-start"
                            >
                                {cloneElement(cat.icon, { className: "mr-4 h-4 w-4" })}
                                {cat.name}
                            </Button>
                        ))}
                    </div>
                    <Button className="flex w-full justify-center rounded-full mt-12 " variant={"secondary"} size="sm">
                        + Add Category
                    </Button>
                    <ProjectCombobox />
                </div>
            </ScrollArea>
        </div>
    );
}

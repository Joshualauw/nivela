"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookTemplate, Box, Boxes, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTitleStore } from "@/hooks/store/useTitleStore";

interface ProjectCardProps {
    id: string;
    name: string;
    image?: string | null;
    category_count: number;
    template_count: number;
    items_count: number;
}

function ProjectCard(props: ProjectCardProps) {
    const { setTitle } = useTitleStore();
    const router = useRouter();

    return (
        <Card className="relative p-2">
            <CardHeader>
                <CardTitle className="mb-4">{props.name}</CardTitle>
                <div className="flex items-center space-x-6 text-gray-500 text-sm">
                    <Image
                        src={props.image ?? "/img/logo.png"}
                        alt="project_logo"
                        width={100}
                        height={50}
                        className="rounded-xl border bg-gray-100"
                    />
                    <div className="space-y-2">
                        <span className="flex items-center">
                            <Boxes className="w-4 h-4 mr-1" /> {props.category_count} Categories
                        </span>
                        <span className="flex items-center">
                            <BookTemplate className="w-4 h-4 mr-1" /> {props.template_count} templates
                        </span>
                        <span className="flex items-center">
                            <Box className="w-4 h-4 mr-1" /> {props.items_count} Items
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="w-full space-x-3">
                <Button
                    onClick={() => {
                        setTitle("overview");
                        router.push(`/dashboard/overview?projectId=${props.id}`);
                    }}
                    variant="secondary"
                    className="w-full"
                >
                    <ExternalLink className="mr-2 w-4 h-4" /> Go To Project
                </Button>
            </CardFooter>
        </Card>
    );
}

export default ProjectCard;

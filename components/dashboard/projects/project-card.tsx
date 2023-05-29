"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookTemplate, Box, Boxes, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ProjectCard() {
    const router = useRouter();

    return (
        <Card className="relative p-2">
            <CardHeader>
                <CardTitle className="mb-4">Tales of Theo</CardTitle>
                <div className="flex items-center space-x-6 text-gray-500 text-sm">
                    <Image
                        src="/img/logo.png"
                        alt="project_logo"
                        width={100}
                        height={50}
                        className="rounded-xl border bg-gray-100"
                    />
                    <div className="space-y-2">
                        <span className="flex items-center">
                            <Boxes className="w-4 h-4 mr-1" /> 12 Categories
                        </span>
                        <span className="flex items-center">
                            <BookTemplate className="w-4 h-4 mr-1" /> 5 templates
                        </span>
                        <span className="flex items-center">
                            <Box className="w-4 h-4 mr-1" /> 100 Items
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="w-full space-x-3">
                <Button
                    onClick={() => router.push("/dashboard/overview?projectId=1")}
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

"use client";

import Navbar from "@/components/dashboard/navbar";
import EditProject from "@/components/dashboard/projects/edit-project";
import ProjectCard from "@/components/dashboard/projects/project-card";
import Error from "@/components/state/error";
import useProject from "@/hooks/service/project/useProject";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTitleStore } from "@/hooks/store/useTitleStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { ScrollArea } from "@/components/ui/scroll-area";

function Projects() {
    const { setTitle } = useTitleStore();
    const { data: session } = useSession();
    const { getAllProjects } = useProject();

    useEffect(() => setTitle("projects"), []);

    const {
        data: projects,
        isLoading,
        error,
    } = useQuery("getAllProjects", () => getAllProjects({ userId: session?.user.id }), { enabled: !!session });
    if (error) return <Error />;

    return (
        <ScrollArea className="h-screen pb-4">
            <Navbar />
            <div className="px-8 py-4 lg:px-20 lg:py-8">
                <div className="my-8 flex justify-between items-center w-full">
                    <h1 className="text-2xl font-bold">My Projects</h1>
                    <EditProject>
                        <Button>+ Create Project</Button>
                    </EditProject>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {isLoading
                        ? Array.from(Array(6), (e, i) => <ProjectsSkeleton key={i} />)
                        : projects?.map((project) => (
                              <ProjectCard
                                  key={project.id}
                                  id={project.id}
                                  name={project.name}
                                  image={project.image}
                                  category_count={project.category_count}
                                  template_count={project.template_count}
                                  items_count={project.items_count}
                              />
                          ))}
                </div>
            </div>
        </ScrollArea>
    );
}

function ProjectsSkeleton() {
    return (
        <div className="flex items-center space-x-4 mt-8">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-4 w-72" />
            </div>
        </div>
    );
}

export default Projects;

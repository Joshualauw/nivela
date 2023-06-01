"use client";

import { Plus } from "lucide-react";
import { EditTemplate } from "@/components/dashboard/templates/edit-template";
import TemplateCard from "@/components/dashboard/templates/template-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectStore } from "@/hooks/store/useProjectStore";
import useTemplate from "@/hooks/service/template/useTemplate";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";

function Templates() {
    const { projectDetail } = useProjectStore();
    const { getAllTemplate } = useTemplate();

    const { data: templates, isLoading } = useQuery(
        ["getAllTemplate", projectDetail?.id],
        () => getAllTemplate(projectDetail!.id),
        {
            enabled: !!projectDetail,
        }
    );

    return (
        <>
            <div className="flex justify-between items-center w-full mb-8 mt-2">
                <h1 className="text-xl font-bold">All Templates</h1>
                <EditTemplate context="create">
                    <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Template
                    </Button>
                </EditTemplate>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {isLoading
                    ? Array.from(Array(8), (e, i) => <TemplatesSkeleton key={i} />)
                    : templates?.data.map((template) => (
                          <TemplateCard
                              key={template.id}
                              id={template.id}
                              name={template.name}
                              fields_count={template.fields.length}
                          />
                      ))}
            </div>
            {templates?.data.length == 0 && <p className="text-center text-gray-400 mt-8">- No Templates Here-</p>}
        </>
    );
}

function TemplatesSkeleton() {
    return (
        <div className="flex flex-col items-center space-y-4 mt-8">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-24 w-full" />
        </div>
    );
}

export default Templates;

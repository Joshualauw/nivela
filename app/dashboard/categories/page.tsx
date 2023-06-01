"use client";

import CategoryCard from "@/components/dashboard/category/category-card";
import { EditCategory } from "@/components/dashboard/category/edit-category";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useCategory from "@/hooks/service/category/useCategory";
import { useProjectStore } from "@/hooks/store/useProjectStore";
import { Plus } from "lucide-react";
import { useQuery } from "react-query";

function Categories() {
    const { projectDetail } = useProjectStore();
    const { getAllCategory } = useCategory();

    const { data: categories, isLoading } = useQuery(
        ["getAllCategory", projectDetail?.id],
        () => getAllCategory(projectDetail!.id),
        {
            enabled: !!projectDetail,
        }
    );

    return (
        <>
            <div className="flex justify-between items-center w-full mt-2 mb-8">
                <h1 className="text-xl font-bold">All Categories</h1>
                <EditCategory context="create">
                    <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Category
                    </Button>
                </EditCategory>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {isLoading
                    ? Array.from(Array(8), (e, i) => <CategoriesSkeleton key={i} />)
                    : categories?.data.map((category) => (
                          <CategoryCard key={category.id} id={category.id} name={category.name} icon={category.icon} />
                      ))}
            </div>
            {categories?.data.length == 0 && <p className="text-center text-gray-400 mt-8">- No Categories Here-</p>}
        </>
    );
}

function CategoriesSkeleton() {
    return (
        <div className="flex flex-col items-center space-y-4 mt-8">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-24 w-full" />
        </div>
    );
}

export default Categories;

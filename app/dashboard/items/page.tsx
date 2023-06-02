"use client";

import EditItem from "@/components/dashboard/item/edit-item";
import ItemCard from "@/components/dashboard/item/item-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import useCategory from "@/hooks/service/useCategory";
import useItem from "@/hooks/service/useItem";
import { useProjectStore } from "@/hooks/store/useProjectStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

function Items() {
    const { projectDetail } = useProjectStore();
    const { getAllItem } = useItem();
    const { getAllCategory } = useCategory();

    const [category, setCategory] = useState("");

    const { data: categories } = useQuery(
        ["getAllCategory", projectDetail?.id],
        () => getAllCategory(projectDetail!.id),
        {
            enabled: !!projectDetail,
        }
    );

    const {
        data: items,
        isLoading,
        refetch,
    } = useQuery(["getAllItems", projectDetail?.id], () => getAllItem(projectDetail!.id, category), {
        enabled: !!projectDetail,
    });

    useEffect(() => {
        refetch();
    }, [category]);

    return (
        <>
            <div className="flex justify-between items-center w-full mb-8 mt-2">
                <div className="flex items-center space-x-5">
                    <h1 className="text-xl font-bold">All Items</h1>
                    <Select onValueChange={(e) => setCategory(e)} defaultValue={category}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="">All</SelectItem>
                                {categories?.data.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {categories && categories.data && (
                    <EditItem context="create" categories={categories.data}>
                        <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Item
                        </Button>
                    </EditItem>
                )}
            </div>
            {categories && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {isLoading
                        ? Array.from(Array(8), (e, i) => <ItemsSkeleton key={i} />)
                        : items?.data.map((item) => (
                              <ItemCard
                                  key={item.id}
                                  id={item.id}
                                  name={item.name}
                                  image={item.image}
                                  categories={categories?.data}
                              />
                          ))}
                </div>
            )}
        </>
    );
}

function ItemsSkeleton() {
    return (
        <div className="flex flex-col items-center space-y-4 mt-8">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-24 w-full" />
        </div>
    );
}

export default Items;

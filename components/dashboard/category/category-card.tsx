"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { DeleteModal } from "../delete-modal";
import { EditCategory } from "./edit-category";
import * as icons from "react-icons/fa";
import { createElement } from "react";
import { useMutation, useQueryClient } from "react-query";
import useCategory from "@/hooks/service/useCategory";
import { toast } from "react-toastify";
import { useProjectStore } from "@/hooks/store/useProjectStore";

interface CategoryCardProps {
    id: string;
    name: string;
    icon: string;
}

function CategoryCard({ id, name, icon }: CategoryCardProps) {
    const { deleteCategory } = useCategory();
    const { projectDetail } = useProjectStore();
    const queryClient = useQueryClient();

    const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation(["deleteCategory", id], deleteCategory, {
        onError: () => {
            toast.error("failed to delete category", { position: toast.POSITION.TOP_RIGHT });
        },
        onSuccess: ({ message }) => {
            toast.success(message, { position: toast.POSITION.TOP_RIGHT });
            queryClient.invalidateQueries(["getAllCategory", projectDetail?.id]);
        },
    });

    return (
        <Card className="hover:scale-[0.98]">
            <CardHeader className="flex justify-center items-center">
                {/*@ts-ignore */}
                {createElement(icons[icon], { className: "w-24 h-24 rounded-full mb-2" })}
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardFooter className="w-full space-x-3">
                <EditCategory context="update" updateId={id}>
                    <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-2 w-4 h-4" /> Edit
                    </Button>
                </EditCategory>
                <DeleteModal callback={() => deleteMutate({ id })} loading={deleteLoading} itemName="category">
                    <Button variant="destructive" size="sm" className="w-full">
                        <Trash className="mr-2 w-4 h-4" /> Delete
                    </Button>
                </DeleteModal>
            </CardFooter>
        </Card>
    );
}

export default CategoryCard;

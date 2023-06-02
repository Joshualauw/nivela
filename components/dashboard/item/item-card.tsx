"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { DeleteModal } from "../delete-modal";
import EditItem from "./edit-item";
import Image from "next/image";
import { Category } from "@prisma/client";
import useItem from "@/hooks/service/useItem";
import { useProjectStore } from "@/hooks/store/useProjectStore";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

interface ItemCardProps {
    id: string;
    name: string;
    image: string | null;
    categories: Category[];
}

function ItemCard({ id, name, image, categories }: ItemCardProps) {
    const { deleteItem } = useItem();
    const { projectDetail } = useProjectStore();
    const queryClient = useQueryClient();

    const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation(["deleteItem", id], deleteItem, {
        onError: () => {
            toast.error("failed to delete category", { position: toast.POSITION.TOP_RIGHT });
        },
        onSuccess: ({ message }) => {
            toast.success(message, { position: toast.POSITION.TOP_RIGHT });
            queryClient.invalidateQueries(["getAllItems", projectDetail?.id]);
        },
    });

    return (
        <Card className="hover:scale-[0.98]">
            <CardHeader className="flex justify-center items-center">
                <Image
                    src={image ?? "/img/logo.png"}
                    alt="temp"
                    width={120}
                    height={120}
                    className="rounded-full mb-2"
                />
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardFooter className="w-full space-x-3">
                <EditItem context="update" updateId={id} categories={categories}>
                    <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-2 w-4 h-4" /> Edit
                    </Button>
                </EditItem>
                <DeleteModal callback={() => deleteMutate({ id })} loading={deleteLoading} itemName="item">
                    <Button variant="destructive" size="sm" className="w-full">
                        <Trash className="mr-2 w-4 h-4" /> Delete
                    </Button>
                </DeleteModal>
            </CardFooter>
        </Card>
    );
}

export default ItemCard;

"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditTemplate } from "@/components/dashboard/templates/edit-template";
import { DeleteModal } from "@/components/dashboard/delete-modal";
import { Edit, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import useTemplate from "@/hooks/service/useTemplate";
import { toast } from "react-toastify";
import { useProjectStore } from "@/hooks/store/useProjectStore";

interface TemplateCardProps {
    id: string;
    name: string;
    fields_count: number;
}

function TemplateCard({ id, name, fields_count }: TemplateCardProps) {
    const { deleteTemplate } = useTemplate();
    const { projectDetail } = useProjectStore();
    const queryClient = useQueryClient();

    const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation(["deleteTemplate", id], deleteTemplate, {
        onError: () => {
            toast.error("failed to delete template", { position: toast.POSITION.TOP_RIGHT });
        },
        onSuccess: ({ message }) => {
            toast.success(message, { position: toast.POSITION.TOP_RIGHT });
            queryClient.invalidateQueries(["getAllTemplate", projectDetail?.id]);
        },
    });

    return (
        <Card className="hover:scale-[0.98]">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{fields_count} Fields Available</CardDescription>
            </CardHeader>
            <CardFooter className="w-full space-x-3">
                <EditTemplate context="update" updateId={id}>
                    <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-2 w-4 h-4" /> Edit
                    </Button>
                </EditTemplate>
                <DeleteModal callback={() => deleteMutate({ id })} loading={deleteLoading} itemName="template">
                    <Button variant="destructive" size="sm" className="w-full">
                        <Trash className="mr-2 w-4 h-4" /> Delete
                    </Button>
                </DeleteModal>
            </CardFooter>
        </Card>
    );
}

export default TemplateCard;

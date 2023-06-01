"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IconPicker from "../../icon-picker";
import { ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useCategory from "@/hooks/service/category/useCategory";
import { useProjectStore } from "@/hooks/store/useProjectStore";
import { FaSpinner } from "react-icons/fa";
import { ApiResponse, ErrorResponse } from "@/types";
import { toast } from "react-toastify";
import ValidationError from "@/components/state/validation-error";
import { Category } from "@prisma/client";

interface EditCategoryProps {
    children: ReactNode;
    context: "create" | "update";
    updateId?: string;
}

export function EditCategory({ children, context, updateId }: EditCategoryProps) {
    const { addCategory, updateCategory, getOneCategory } = useCategory();
    const { projectDetail } = useProjectStore();
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    function resetState() {
        setErrors([]);
        setIcon("");
        setName("");
    }

    function handleError(err: any) {
        const { code, detail } = JSON.parse(err.message) as ErrorResponse;
        if (code == 400) {
            setErrors(detail.errors);
        } else {
            setOpen(false);
            toast.error(`failed to ${context} category`, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    function handleSuccess({ message }: ApiResponse<Category>) {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
        setOpen(false);
        resetState();
        queryClient.invalidateQueries(["getAllCategory", projectDetail?.id]);
        queryClient.invalidateQueries(["getOneCategory", updateId]);
    }

    const { mutate: createMutate, isLoading: createLoading } = useMutation("addCategory", addCategory, {
        onError: handleError,
        onSuccess: handleSuccess,
    });

    const { mutate: updateMutate, isLoading: updateLoading } = useMutation("updateCategory", updateCategory, {
        onError: handleError,
        onSuccess: handleSuccess,
    });

    useQuery(["getOneCategory", updateId], () => getOneCategory(updateId!), {
        enabled: !!updateId,
        onSuccess: ({ data }) => {
            if (data) {
                setName(data.name);
                setIcon(data.icon);
            }
        },
        onError: () => {
            setOpen(false);
            toast.error("Error while populating data", { position: toast.POSITION.TOP_RIGHT });
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{context == "create" ? "Add Category" : "Edit Category"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-5 mt-4">
                    <div className="flex flex-col space-y-2">
                        <Label>Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name..." />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Icon</Label>
                        <IconPicker iconPicked={icon} handleIconPicked={(iconName) => setIcon(iconName)} />
                    </div>
                    <ValidationError errors={errors} />
                </div>
                <DialogFooter>
                    {projectDetail &&
                        (context == "create" ? (
                            <Button
                                onClick={() => createMutate({ name, icon, projectId: projectDetail.id })}
                                type="button"
                                disabled={createLoading}
                            >
                                {createLoading && <FaSpinner className="w-4 h-4 mr-2 animate-spin" />} Save
                            </Button>
                        ) : (
                            <Button
                                onClick={() => updateMutate({ name, icon, id: updateId! })}
                                type="button"
                                disabled={updateLoading}
                            >
                                {updateLoading && <FaSpinner className="w-4 h-4 mr-2 animate-spin" />} Save
                            </Button>
                        ))}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

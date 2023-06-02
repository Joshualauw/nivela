"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Category, Field, Item } from "@prisma/client";
import TemplateBuilder from "../templates/template-builder";
import useItem from "@/hooks/service/useItem";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ApiResponse, ErrorResponse } from "@/types";
import { toast } from "react-toastify";
import { useProjectStore } from "@/hooks/store/useProjectStore";
import { FaSpinner } from "react-icons/fa";
import ValidationError from "@/components/state/validation-error";
import { useTemplateStore } from "@/hooks/store/useTemplateStore";

interface EditItemProps {
    context: "create" | "update";
    children: ReactNode;
    categories: Category[];
    updateId?: string;
}

function EditItem({ children, context, updateId, categories }: EditItemProps) {
    const { projectDetail } = useProjectStore();
    const { addItem, getOneItem, updateItem } = useItem();
    const { templateFields, setTemplateFields } = useTemplateStore();
    const queryClient = useQueryClient();

    const [name, setName] = useState("");
    const [category, setCategory] = useState(categories[0].id);
    const [image, setImage] = useState<File | null>(null);
    const [fields, setFields] = useState<Field[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setFields([...templateFields]);
    }, [templateFields]);

    function resetState() {
        setName("");
        setImage(null);
        setErrors([]);
        setTemplateFields([]);
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    }

    function handleError(err: any) {
        const { code, detail } = JSON.parse(err.message) as ErrorResponse;
        if (code == 400) {
            setErrors(detail.errors);
        } else {
            setOpen(false);
            toast.error(`failed to ${context} template`, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    function handleSuccess({ message }: ApiResponse<Item>) {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
        setOpen(false);
        resetState();
        queryClient.invalidateQueries(["getAllItems", projectDetail?.id]);
        queryClient.invalidateQueries(["getOneItem", updateId]);
    }

    const { mutate: createMutate, isLoading: createLoading } = useMutation("addItem", addItem, {
        onError: handleError,
        onSuccess: handleSuccess,
    });

    const { mutate: updateMutate, isLoading: updateLoading } = useMutation("updateItem", updateItem, {
        onError: handleError,
        onSuccess: handleSuccess,
    });

    useQuery(["getOneTemplate", updateId], () => getOneItem(updateId!), {
        enabled: !!updateId,
        onSuccess: ({ data }) => {
            if (data) {
                setName(data.name);
                setFields(data.fields);
                if (data.category) {
                    setCategory(data.category.id);
                }
            }
        },
        onError: () => {
            setOpen(false);
            toast.error(`Error while populating data`, { position: toast.POSITION.TOP_RIGHT });
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{context == "create" ? "Add Item" : "Edit Item"}</DialogTitle>
                </DialogHeader>
                <form className="space-y-5 mt-4">
                    <div className="flex flex-col space-y-2">
                        <Label>Image</Label>
                        <Input onChange={handleFileChange} type="file" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Category</Label>
                        <Select onValueChange={(e) => setCategory(e)} defaultValue={category}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Separator className="my-5" />
                    <TemplateBuilder fields={fields} setFields={setFields} applyTemplate />
                    <ValidationError errors={errors} />
                </form>
                <DialogFooter>
                    {projectDetail &&
                        (context == "create" ? (
                            <Button
                                onClick={() =>
                                    createMutate({
                                        name,
                                        projectId: projectDetail.id,
                                        categoryId: category,
                                        fields,
                                        image,
                                    })
                                }
                                disabled={createLoading}
                            >
                                {createLoading && <FaSpinner className="w-4 h-4 mr-2 animate-spin" />} Save
                            </Button>
                        ) : (
                            <Button
                                onClick={() =>
                                    updateMutate({ name, fields, image, categoryId: category, id: updateId! })
                                }
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

export default EditItem;

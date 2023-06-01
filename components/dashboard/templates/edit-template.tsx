"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode, useEffect, useState } from "react";
import TemplateField from "./template-field";
import { Field, Template } from "@prisma/client";
import TemplateItem from "./template-item";
import { swapItems } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useTemplate from "@/hooks/service/template/useTemplate";
import { useProjectStore } from "@/hooks/store/useProjectStore";
import { FaSpinner } from "react-icons/fa";
import { ApiResponse, ErrorResponse } from "@/types";
import { toast } from "react-toastify";
import ValidationError from "@/components/state/validation-error";

interface EditTemplateProps {
    context: "create" | "update";
    children: ReactNode;
    updateId?: string;
}

export function EditTemplate({ context, children, updateId }: EditTemplateProps) {
    const [name, setName] = useState("");
    const [fields, setFields] = useState<Field[]>([]);
    const [open, setOpen] = useState(false);
    const [openField, setOpenField] = useState(false);
    const [fieldData, setFieldData] = useState<Field | null>(null);
    const [fieldUpdateId, setFieldUpdateId] = useState<number | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [fieldContext, setFieldContext] = useState<"create" | "update">("create");

    const { addTemplate, getOneTemplate, updateTemplate } = useTemplate();
    const { projectDetail } = useProjectStore();
    const queryClient = useQueryClient();

    function handleSwap(idx: number) {
        setFields(swapItems([...fields], idx));
    }

    function resetState() {
        setName("");
        setFields([]);
        setErrors([]);
    }

    function handleEditField(field: Field, idx: number) {
        setFieldContext("update");
        setFieldData(field);
        setFieldUpdateId(idx);
        setOpenField(true);
    }

    function handleCreateField() {
        setFieldContext("create");
        setFieldData(null);
        setFieldUpdateId(null);
        setOpenField(true);
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

    function handleSuccess({ message }: ApiResponse<Template>) {
        toast.success(message, { position: toast.POSITION.TOP_RIGHT });
        setOpen(false);
        resetState();
        queryClient.invalidateQueries(["getAllTemplate", projectDetail?.id]);
        queryClient.invalidateQueries(["getOneTemplate", updateId]);
    }

    const { mutate: createMutate, isLoading: createLoading } = useMutation("addTemplate", addTemplate, {
        onError: handleError,
        onSuccess: handleSuccess,
    });

    const { mutate: updateMutate, isLoading: updateLoading } = useMutation("updateTemplate", updateTemplate, {
        onError: handleError,
        onSuccess: handleSuccess,
    });

    useQuery(["getOneTemplate", updateId], () => getOneTemplate(updateId!), {
        enabled: !!updateId,
        onSuccess: ({ data }) => {
            if (data) {
                setName(data.name);
                setFields(data.fields);
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
                    <DialogTitle className="font-bold text-lg">
                        {context == "create" ? "Add Template" : "Edit Template"}
                    </DialogTitle>
                </DialogHeader>
                <form className="space-y-3">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Template name.." />
                    </div>
                    <div className="space-y-4">
                        <div className="flex w-full items-center justify-between">
                            <Label>Fields</Label>
                            <Dialog open={openField} onOpenChange={setOpenField}>
                                <DialogTrigger asChild>
                                    <Button onClick={handleCreateField} variant="ghost" size="sm" type="button">
                                        + Add Field
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <TemplateField
                                        context={fieldContext}
                                        setFields={setFields}
                                        fields={fields}
                                        updateId={fieldUpdateId}
                                        fieldData={fieldData}
                                        close={setOpenField}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                        {fields.map((f, i) => (
                            <TemplateItem
                                key={i}
                                idx={i}
                                field={f}
                                handleSwap={handleSwap}
                                handleEditField={handleEditField}
                                callback={() => setFields(fields.filter((fd) => fd.title !== f.title))}
                            />
                        ))}
                    </div>
                    <ValidationError errors={errors} />
                </form>
                <DialogFooter>
                    {projectDetail &&
                        (context == "create" ? (
                            <Button
                                onClick={() => createMutate({ name, projectId: projectDetail.id, fields })}
                                disabled={createLoading}
                            >
                                {createLoading && <FaSpinner className="w-4 h-4 mr-2 animate-spin" />} Save
                            </Button>
                        ) : (
                            <Button
                                onClick={() => updateMutate({ name, fields, id: updateId! })}
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

"use client";

import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Field } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { swapItems } from "@/lib/utils";
import TemplateField from "./template-field";
import TemplateItem from "./template-item";
import ApplyTemplate from "./apply-template";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TemplateBuilderProps {
    fields: Field[];
    setFields: Function;
    applyTemplate?: boolean;
}

function TemplateBuilder({ fields, setFields, applyTemplate }: TemplateBuilderProps) {
    const [openField, setOpenField] = useState(false);
    const [fieldData, setFieldData] = useState<Field | null>(null);
    const [fieldUpdateId, setFieldUpdateId] = useState<number | null>(null);
    const [fieldContext, setFieldContext] = useState<"create" | "update">("create");

    function handleSwap(idx: number) {
        setFields(swapItems([...fields], idx));
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

    return (
        <div className="space-y-4">
            <div className="flex w-full items-center justify-between">
                <Label>Fields</Label>
                <div className="space-x-2">
                    {applyTemplate && <ApplyTemplate />}
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
            </div>
            <ScrollArea className="w-full h-[150px]">
                {fields.length == 0 && <p className="text-center mt-2 text-gray-500">-no fields-</p>}
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
            </ScrollArea>
        </div>
    );
}

export default TemplateBuilder;

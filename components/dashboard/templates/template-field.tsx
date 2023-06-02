"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldType } from "@prisma/client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

interface TemplateFieldProps {
    context: "create" | "update";
    fields: Field[];
    setFields: Function;
    close: Function;
    fieldData?: Field | null;
    updateId?: number | null;
}

function TemplateField({ context, setFields, fields, fieldData, close, updateId }: TemplateFieldProps) {
    const [name, setName] = useState("");
    const [type, setType] = useState<FieldType>("text");

    useEffect(() => {
        function populateData() {
            if (fieldData) {
                setName(fieldData.title);
                setType(fieldData.type);
            }
        }
        populateData();
    }, [fieldData]);

    function handleFieldSave() {
        if (context == "create") {
            setFields([...fields, { title: name, type }]);
        } else {
            const newFields = [...fields];
            const fieldIdx = fields.findIndex((f, i) => i == updateId);
            newFields[fieldIdx] = { title: name, type, value: [] };
            setFields(newFields);
        }
        close(false);
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle className="font-bold text-lg">
                    {context == "create" ? "Add Field" : "Edit Field"}
                </DialogTitle>
            </DialogHeader>
            <form className="space-y-5 mt-4">
                <div className="flex flex-col space-y-2">
                    <Label>
                        Name <span className="text-gray-400">(same name will be grouped)</span>
                    </Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Field Name" />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Type</Label>
                    <Select defaultValue={type} onValueChange={(e) => setType(e as FieldType)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Field Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="textarea">Text Area</SelectItem>
                                <SelectItem value="source">Data Source</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </form>
            <DialogFooter>
                <Button onClick={handleFieldSave} type="button">
                    Save
                </Button>
            </DialogFooter>
        </>
    );
}

export default TemplateField;

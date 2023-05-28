import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field } from "@prisma/client";
import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";

interface TemplateFieldProps {
    context: "create" | "update";
    data?: Field;
}

function TemplateField({ context, data }: TemplateFieldProps) {
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
                    <Input placeholder="Field Name" />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Type</Label>
                    <Select>
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
                <Button type="button">Save</Button>
            </DialogFooter>
        </>
    );
}

export default TemplateField;

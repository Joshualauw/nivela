"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit, Pencil, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ReactNode, useState } from "react";
import TemplateField from "./template-field";
import { Card, CardHeader } from "@/components/ui/card";
import { DeleteModal } from "../delete-modal";

interface EditTemplateProps {
    context: "create" | "update";
    children: ReactNode;
}

export function EditTemplate({ context, children }: EditTemplateProps) {
    const [fields, setFields] = useState([{ title: "Template 1", single: false, source: false, unit: "" }]);

    return (
        <Dialog>
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
                        <Input placeholder="Template name.." />
                    </div>
                    <div className="space-y-2">
                        <div className="flex w-full items-center justify-between">
                            <Label>Fields</Label>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm" type="button">
                                        + Add Field
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <TemplateField context="create" />
                                </DialogContent>
                            </Dialog>
                        </div>
                        {fields.map((f) => (
                            <Card key={f.title}>
                                <CardHeader className="relative">
                                    <div className="absolute top-2 right-2 space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="secondary" size="sm" type="button">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <TemplateField context="update" />
                                            </DialogContent>
                                        </Dialog>
                                        <DeleteModal callback={() => {}}>
                                            <Button variant="destructive" size="sm" type="button">
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </DeleteModal>
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                        <p>Title: {f.title}</p>
                                        <p>Type: {f.single ? "Single" : "Multiple"}</p>
                                        <p>Source: {f.source ? "Datasource" : "None"}</p>
                                        <p>Unit: {f.unit}</p>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </form>
                <DialogFooter>
                    <Button>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

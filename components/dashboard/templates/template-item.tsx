"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field } from "@prisma/client";
import { ArrowDown, ArrowUp, Pencil, Trash } from "lucide-react";
import { DeleteModal } from "../delete-modal";

interface TemplateItemProps {
    idx: number;
    field: Field;
    handleEditField: (f: Field, i: number) => void;
    handleSwap: (idx: number) => void;
    callback: () => void;
}

function TemplateItem({ field, idx, callback, handleEditField, handleSwap }: TemplateItemProps) {
    return (
        <div className="flex items-center w-full space-x-2 mb-3">
            <div className="space-y-2 text-gray-400 w-fit">
                <ArrowUp onClick={() => handleSwap(idx - 1)} className="p-1 w-7 h-7 rounded-full hover:bg-gray-200" />
                <ArrowDown onClick={() => handleSwap(idx)} className="p-1 w-7 h-7 rounded-full hover:bg-gray-200" />
            </div>
            <Card className="w-full">
                <CardContent className="relative py-3 px-4">
                    <div className="absolute top-3 right-3 space-x-2">
                        <Button onClick={() => handleEditField(field, idx)} variant="secondary" size="sm" type="button">
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <DeleteModal instaClose callback={callback}>
                            <Button variant="destructive" size="sm" type="button">
                                <Trash className="w-4 h-4" />
                            </Button>
                        </DeleteModal>
                    </div>
                    <div className="text-gray-600 text-sm">
                        <p>Title: {field.title}</p>
                        <p>Type: {field.type}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default TemplateItem;

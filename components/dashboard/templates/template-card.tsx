"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditTemplate } from "@/components/dashboard/templates/edit-template";
import { DeleteModal } from "@/components/dashboard/delete-modal";
import { Edit, Trash } from "lucide-react";

function TemplateCard() {
    return (
        <Card className="hover:scale-[0.98]">
            <CardHeader>
                <CardTitle>World Building</CardTitle>
                <CardDescription>12 Fields Available</CardDescription>
            </CardHeader>
            <CardFooter className="w-full space-x-3">
                <EditTemplate context="update">
                    <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-2 w-4 h-4" /> Edit
                    </Button>
                </EditTemplate>
                <DeleteModal callback={() => {}} itemName="template">
                    <Button variant="destructive" size="sm" className="w-full">
                        <Trash className="mr-2 w-4 h-4" /> Delete
                    </Button>
                </DeleteModal>
            </CardFooter>
        </Card>
    );
}

export default TemplateCard;

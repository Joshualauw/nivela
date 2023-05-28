"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IconPicker from "../../icon-picker";
import { ReactNode, useState } from "react";

interface EditCategoryProps {
    children: ReactNode;
    context: "create" | "update";
}

export function EditCategory({ children, context }: EditCategoryProps) {
    const [pickedIcon, setPickedIcon] = useState("");

    function handleIconPicked(iconName: string) {
        setPickedIcon(iconName);
        console.log(pickedIcon);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{context == "create" ? "Add Category" : "Edit Category"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-5 mt-4">
                    <div className="flex flex-col space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="Category Name..." />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Icon</Label>
                        <IconPicker iconPicked={pickedIcon} handleIconPicked={handleIconPicked} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

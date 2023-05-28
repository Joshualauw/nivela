"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";
import TemplateField from "../templates/template-field";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, Link, Pencil, Trash } from "lucide-react";
import { DeleteModal } from "../delete-modal";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EditTemplate } from "../templates/edit-template";
import { DialogDescription } from "@radix-ui/react-dialog";

interface EditItemProps {
    children: ReactNode;
    context: "create" | "update";
}

function EditItem({ children, context }: EditItemProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{context == "create" ? "Add Item" : "Edit Item"}</DialogTitle>
                </DialogHeader>
                <form className="space-y-5 mt-4">
                    <div className="flex flex-col space-y-2">
                        <Label>Image</Label>
                        <Input type="file" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="Item Name" />
                    </div>
                    <Separator className="my-5" />
                    <div className="flex items-center justify-between mb-2">
                        <Label>Additional Fields</Label>
                        <div>
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
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary" size="sm" type="button">
                                        Apply Template
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="font-bold text-lg">Apply Template</DialogTitle>
                                        <DialogDescription className="text-sm text-gray-500">
                                            warning! re-applying template will replace existing fields and values!
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-2 mt-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>World Building</CardTitle>
                                                <CardDescription>12 Fields Available</CardDescription>
                                            </CardHeader>
                                            <CardFooter className="w-full space-x-3">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    Select
                                                </Button>
                                                <Button size="sm">
                                                    <ExternalLink className="w-4 h-4" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Age</Label>
                        <div className="flex items-center space-x-2">
                            <Input placeholder="Age" />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary" size="sm">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <TemplateField context="update" />
                                </DialogContent>
                            </Dialog>
                            <DeleteModal callback={() => {}}>
                                <Button variant="destructive" size="sm">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </DeleteModal>
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditItem;

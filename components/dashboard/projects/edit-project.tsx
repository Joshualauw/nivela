import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode } from "react";

interface EditProjectProps {
    children: ReactNode;
}

function EditProject({ children }: EditProjectProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-5 mt-4">
                    <div className="flex flex-col space-y-2">
                        <Label>Background Image</Label>
                        <Input type="file" placeholder="Project Image..." />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="Project Name..." />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Project Description..." />
                    </div>
                </div>
                <DialogFooter>
                    <Button>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditProject;

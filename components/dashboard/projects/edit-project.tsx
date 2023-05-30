import ValidationError from "@/components/state/validation-error";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/service/project/useProject";
import { ErrorResponse } from "@/types";
import { ChangeEvent, ReactNode, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

interface EditProjectProps {
    children: ReactNode;
}

function EditProject({ children }: EditProjectProps) {
    const { addProject } = useProject();
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    }

    const { mutate, isLoading } = useMutation("addProject", addProject, {
        onError: (err: any) => {
            const { code, detail } = JSON.parse(err.message) as ErrorResponse;
            if (code == 400) {
                setErrors(detail.errors);
            } else {
                setOpen(false);
                toast.error("failed to create project", { position: toast.POSITION.TOP_RIGHT });
            }
        },
        onSuccess: ({ message }) => {
            toast.success(message, { position: toast.POSITION.TOP_RIGHT });
            setOpen(false);
            queryClient.invalidateQueries("getAllProjects");
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-5 mt-4">
                    <div className="flex flex-col space-y-2">
                        <Label>Background Image</Label>
                        <Input onChange={handleFileChange} type="file" placeholder="Project Image..." />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name..." />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Project Description..."
                        />
                    </div>
                    <ValidationError errors={errors} />
                </div>
                <DialogFooter>
                    <Button onClick={() => mutate({ name, description, image })} type="button" disabled={isLoading}>
                        {isLoading && <FaSpinner className="w-4 h-4 mr-2 animate-spin" />} Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditProject;

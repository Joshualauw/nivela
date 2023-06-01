"use client";

import { DeleteModal } from "@/components/dashboard/delete-modal";
import ValidationError from "@/components/state/validation-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/service/project/useProject";
import { useProjectStore } from "@/hooks/store/useProjectStore";
import { ErrorResponse } from "@/types";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

function Settings() {
    const { projectDetail, setProjectDetail } = useProjectStore();
    const { updateProject, deleteProject } = useProject();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [image, setImage] = useState<File | null>();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        function populateData() {
            if (projectDetail) {
                setImageUrl(projectDetail.image);
                setName(projectDetail.name);
                setDescription(projectDetail.description);
            }
        }
        populateData();
    }, [projectDetail]);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    }

    const { mutate: updateMutate, isLoading: updateLoading } = useMutation("updateProject", updateProject, {
        onError: (err: any) => {
            const { code, detail } = JSON.parse(err.message) as ErrorResponse;
            if (code == 400) {
                setErrors(detail.errors);
            } else {
                toast.error("failed to update project", { position: toast.POSITION.TOP_RIGHT });
            }
        },
        onSuccess: ({ message, data }) => {
            toast.success(message, { position: toast.POSITION.TOP_RIGHT });
            setImageUrl(data.image);
            setProjectDetail({ ...projectDetail!, name: data.name, description: data.description });
        },
    });

    const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation(
        ["deleteProject", projectDetail?.id],
        deleteProject,
        {
            onError: () => {
                toast.error("failed to delete project", { position: toast.POSITION.TOP_RIGHT });
            },
            onSuccess: ({ message }) => {
                toast.success(message, { position: toast.POSITION.TOP_RIGHT });
                queryClient.invalidateQueries("getAllProjects");
                router.replace("/projects");
            },
        }
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>Customize details of your projects</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8 mt-4 flex flex-col">
                    <Image
                        src={imageUrl ?? "/img/logo.png"}
                        alt="background_image"
                        className="self-center md:self-start"
                        width={200}
                        height={100}
                    />
                    <div className="flex flex-col space-y-3">
                        <Label>Background Image</Label>
                        <Input onChange={handleFileChange} type="file" placeholder="Project Image..." />
                    </div>
                    <div className="flex flex-col space-y-3">
                        <Label>Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name..." />
                    </div>
                    <div className="flex flex-col space-y-3">
                        <Label>Description</Label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Project Description..."
                        />
                    </div>
                    {projectDetail && (
                        <Button
                            onClick={() => updateMutate({ name, description, image, id: projectDetail.id })}
                            className="w-full md:w-1/2"
                            disabled={updateLoading}
                        >
                            {updateLoading && <FaSpinner className="w-4 h-4 mr-2 animate-spin" />} Save
                        </Button>
                    )}
                    <ValidationError errors={errors} />
                </div>
                <h2 className="text-xl font-bold leading-none tracking-tight my-8">Danger Zone</h2>
                {projectDetail && (
                    <DeleteModal
                        callback={() => deleteMutate({ id: projectDetail.id })}
                        loading={deleteLoading}
                        itemName="project"
                    >
                        <Button variant="destructive">
                            <AlertTriangle className="mr-2 w-5 h-5" /> Delete Project
                        </Button>
                    </DeleteModal>
                )}
            </CardContent>
        </Card>
    );
}

export default Settings;

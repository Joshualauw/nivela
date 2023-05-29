"use client";

import { DeleteModal } from "@/components/dashboard/delete-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";

function Settings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>Customize details of your projects</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8 mt-4">
                    <div className="flex flex-col space-y-3">
                        <Label>Background Image</Label>
                        <Input type="file" placeholder="Project Image..." />
                    </div>
                    <div className="flex flex-col space-y-3">
                        <Label>Name</Label>
                        <Input placeholder="Project Name..." />
                    </div>
                    <div className="flex flex-col space-y-3">
                        <Label>Description</Label>
                        <Textarea placeholder="Project Description..." />
                    </div>
                </div>
                <h2 className="text-xl font-bold leading-none tracking-tight my-8">Danger Zone</h2>
                <DeleteModal callback={() => {}} itemName="project">
                    <Button variant="destructive">
                        <AlertTriangle className="mr-2 w-5 h-5" /> Delete Project
                    </Button>
                </DeleteModal>
            </CardContent>
        </Card>
    );
}

export default Settings;

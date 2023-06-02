"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import useTemplate from "@/hooks/service/useTemplate";
import { useProjectStore } from "@/hooks/store/useProjectStore";
import { useTemplateStore } from "@/hooks/store/useTemplateStore";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useQuery } from "react-query";

function ApplyTemplate() {
    const { projectDetail } = useProjectStore();
    const { getAllTemplate } = useTemplate();
    const { setTemplateFields } = useTemplateStore();
    const [open, setOpen] = useState(false);

    const { data: templates, isLoading } = useQuery(
        ["getAllTemplate", projectDetail?.id],
        () => getAllTemplate(projectDetail!.id),
        {
            enabled: !!projectDetail,
        }
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" size="sm" type="button">
                    Apply Template
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[500px]">
                <DialogHeader>
                    <DialogTitle className="font-bold text-lg">Apply Template</DialogTitle>
                    <DialogDescription className="text-sm text-red-500">
                        warning! applying template may replace existing fields and values!
                    </DialogDescription>
                </DialogHeader>
                {isLoading && <p className="text-center mt-2">Loading...</p>}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    {templates?.data.map((template) => (
                        <Card key={template.id}>
                            <CardHeader>
                                <CardTitle className="text-lg">{template.name}</CardTitle>
                                <CardDescription>{template.fields.length} Fields Available</CardDescription>
                            </CardHeader>
                            <CardFooter className="w-full space-x-3">
                                <Button
                                    onClick={(e) => {
                                        setTemplateFields(template.fields);
                                        setOpen(false);
                                    }}
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                >
                                    Select
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ApplyTemplate;

"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode, useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { FaSpinner } from "react-icons/fa";

interface DeleteModalProps {
    children: ReactNode;
    itemName?: string;
    loading?: boolean;
    instaClose?: boolean;
    callback: () => void;
}

export function DeleteModal({ children, callback, loading, itemName, instaClose }: DeleteModalProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!loading) setOpen(false);
    }, [loading]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {itemName ?? "item"} and remove your
                        data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        disabled={loading}
                        type="button"
                        onClick={() => {
                            callback();
                            if (instaClose) setOpen(false);
                        }}
                    >
                        {loading && <FaSpinner className="w-4 h-4 mr-2 animate-spin" />} Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

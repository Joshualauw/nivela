"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { DeleteModal } from "../delete-modal";
import EditItem from "./edit-item";
import Image from "next/image";

function ItemCard() {
    return (
        <Card className="hover:scale-[0.98]">
            <CardHeader className="flex justify-center items-center">
                <Image
                    src="/img/logo.png"
                    alt="temp"
                    width={100}
                    height={100}
                    className="rounded-full p-2 bg-gray-200 mb-2"
                />
                <CardTitle>Theo Arvan</CardTitle>
            </CardHeader>
            <CardFooter className="w-full space-x-3">
                <EditItem context="update">
                    <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-2 w-4 h-4" /> Edit
                    </Button>
                </EditItem>
                <DeleteModal callback={() => {}}>
                    <Button variant="destructive" size="sm" className="w-full">
                        <Trash className="mr-2 w-4 h-4" /> Delete
                    </Button>
                </DeleteModal>
            </CardFooter>
        </Card>
    );
}

export default ItemCard;

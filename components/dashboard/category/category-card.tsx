"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { DeleteModal } from "../delete-modal";
import { FaMountain } from "react-icons/fa";
import { EditCategory } from "./edit-category";

function CategoryCard() {
    return (
        <Card className="hover:scale-[0.98]">
            <CardHeader className="flex justify-center items-center">
                <FaMountain className="w-36 h-36 rounded-full p-2 bg-gray-200 mb-2" />
                <CardTitle>World Building</CardTitle>
            </CardHeader>
            <CardFooter className="w-full space-x-3">
                <EditCategory context="update">
                    <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-2 w-4 h-4" /> Edit
                    </Button>
                </EditCategory>
                <DeleteModal callback={() => {}} itemName="category">
                    <Button variant="destructive" size="sm" className="w-full">
                        <Trash className="mr-2 w-4 h-4" /> Delete
                    </Button>
                </DeleteModal>
            </CardFooter>
        </Card>
    );
}

export default CategoryCard;

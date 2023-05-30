import ItemCard from "@/components/dashboard/item/item-card";
import EditItem from "@/components/dashboard/item/edit-item";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

function Category() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <ItemCard />
            <EditItem context="create">
                <Card className="hover:scale-[0.98] bg-gray-100 flex justify-center items-center">
                    <CardContent className="w-full h-full flex justify-center items-center">
                        <Plus className="w-16 h-16 text-gray-400" />
                    </CardContent>
                </Card>
            </EditItem>
        </div>
    );
}

export default Category;

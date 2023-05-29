import CategoryCard from "@/components/dashboard/category/category-card";
import { EditCategory } from "@/components/dashboard/category/edit-category";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

function Categories() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CategoryCard />
            <EditCategory context="create">
                <Card className="hover:scale-[0.98] bg-gray-100 flex justify-center items-center">
                    <CardContent className="w-full h-full flex justify-center items-center">
                        <Plus className="w-16 h-16 text-gray-400" />
                    </CardContent>
                </Card>
            </EditCategory>
        </div>
    );
}

export default Categories;

import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EditTemplate } from "@/components/dashboard/templates/edit-template";
import TemplateCard from "@/components/dashboard/templates/template-card";

function Templates() {
    return (
        <div className="grid grid-cols-4 gap-8">
            <TemplateCard />
            <EditTemplate context="create">
                <Card className="hover:scale-[0.98] bg-gray-100 flex justify-center items-center">
                    <CardContent className="w-full h-full flex justify-center items-center">
                        <Plus className="w-16 h-16 text-gray-400" />
                    </CardContent>
                </Card>
            </EditTemplate>
        </div>
    );
}

export default Templates;

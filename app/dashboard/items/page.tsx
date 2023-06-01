import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

function Items() {
    return (
        <>
            <div className="flex justify-between items-center w-full mb-8 mt-2">
                <div className="flex items-center space-x-5">
                    <h1 className="text-xl font-bold">All Items</h1>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="world-buiding">World Building</SelectItem>
                                <SelectItem value="character">Characters</SelectItem>
                                <SelectItem value="places">Places</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Item
                </Button>
            </div>
        </>
    );
}

export default Items;

"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const frameworks = [
    {
        value: "1",
        label: "Tales of Theo",
    },
    {
        value: "2",
        label: "Re:Swordsman",
    },
    {
        value: "3",
        label: "Demon Angel",
    },
];

export function ProjectCombobox() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    bounce="none"
                    role="combobox"
                    aria-expanded={open}
                    className="flex justify-between w-[calc(100%-56px)] bottom-12 items-center absolute space-x-2 rounded-full "
                >
                    {value ? frameworks.find((framework) => framework.value === value)?.label : "Select Project"}
                    <div className="flex items-center ml-2">
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                        <PlusIcon
                            onClick={(e) => e.stopPropagation()}
                            className="ml-4 hover:opacity-100 h-4 w-4 shrink-0 opacity-50"
                        />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search projects..." />
                    <CommandEmpty>No project found.</CommandEmpty>
                    <CommandGroup>
                        {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === framework.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {framework.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

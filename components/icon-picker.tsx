"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { createElement, useState } from "react";
import { buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import * as icons from "react-icons/fa";

interface IconPickerProps {
    className?: string;
    iconPicked: string;
    handleIconPicked: (iconName: string) => void;
}

function IconPicker({ iconPicked, handleIconPicked, className }: IconPickerProps) {
    const [filterIcons, setFilterIcons] = useState(Object.keys(icons));

    function handleIconSearch(e: any) {
        const filteredIcons = Object.keys(icons).filter((icon) => {
            return icon.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilterIcons(filteredIcons);
    }

    return (
        <Popover modal>
            <PopoverTrigger className={className}>
                <p className={buttonVariants({ variant: "outline", className: "w-full" })}>
                    {/*@ts-ignore */}
                    {iconPicked ? createElement(icons[iconPicked]) : "Select Icon"}
                </p>
            </PopoverTrigger>
            <PopoverContent className="w-64">
                <Input onChange={handleIconSearch} placeholder="Search Icons..." className="mb-4" autoFocus />
                <ScrollArea className="h-60">
                    <div className="grid grid-cols-4 gap-4">
                        {filterIcons.map((icon, id) => (
                            <div
                                onClick={() => handleIconPicked(icon)}
                                key={id}
                                className="p-3 rounded-md hover:brightness-75 border"
                            >
                                {/*@ts-ignore */}
                                {createElement(icons[icon])}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}

export default IconPicker;

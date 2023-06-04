"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useItem from "@/hooks/service/useItem";
import { useProjectStore } from "@/hooks/store/useProjectStore";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FieldType, FieldValue } from "@prisma/client";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FaCircle } from "react-icons/fa";

interface ItemValueProps {
    type: FieldType;
    fieldValue: FieldValue;
    idx: number;
    handleUpdate: (key: string, value: string, idx: number) => void;
    handleSwap: (idx: number) => void;
    handleDelete: (key: string) => void;
}

function ItemValue({ type, fieldValue, handleSwap, handleDelete, handleUpdate, idx }: ItemValueProps) {
    const { getCategoryitems } = useItem();
    const { projectDetail } = useProjectStore();

    const [content, setContent] = useState(fieldValue.content || "");
    const [link, setLink] = useState(fieldValue.linkname || "");
    const [url, setUrl] = useState(fieldValue.url || "");

    useEffect(() => {
        if (fieldValue) {
            setContent(fieldValue.content || "");
            setLink(fieldValue.linkname || "");
            setUrl(fieldValue.url || "");
        }
    }, [fieldValue]);

    const { data: items } = useQuery(
        ["getCategoryItems", projectDetail?.id],
        () => getCategoryitems(projectDetail!.id),
        {
            enabled: !!(projectDetail && type == "source"),
        }
    );

    return (
        <div className="mb-2 flex items-center w-full space-x-2">
            <div className=" text-gray-400 w-fit">
                <ArrowUp onClick={() => handleSwap(idx - 1)} className="p-1 w-6 h-6 rounded-full hover:bg-gray-200" />
                <ArrowDown onClick={() => handleSwap(idx)} className="p-1 w-6 h-6 rounded-full hover:bg-gray-200" />
            </div>
            {type == "text" && (
                <Input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="content" />
            )}
            {type == "textarea" && (
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="content" />
            )}
            {type == "source" && (
                <div className="flex items-center w-full space-x-2">
                    <Input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="w-1/2"
                        placeholder="name"
                    />
                    <FaCircle className="w-2 h-2 " />
                    <Select defaultValue={url} onValueChange={(e) => setUrl(`${e}?projectDetail=${projectDetail?.id}`)}>
                        <SelectTrigger className="w-1/2">
                            <SelectValue placeholder="Select Item" />
                        </SelectTrigger>
                        <SelectContent>
                            {items?.map((item) => (
                                <SelectGroup key={item.category}>
                                    <SelectLabel>{item.category}</SelectLabel>
                                    {item.items.map((it) => (
                                        <SelectItem key={it.url} value={it.url}>
                                            {it.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
            <Button onClick={() => handleDelete(content)} variant="destructive" size="sm" type="button">
                <Trash className="w-4 h-4" />
            </Button>
        </div>
    );
}

export default ItemValue;

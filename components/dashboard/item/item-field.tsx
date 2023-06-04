"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FieldType, FieldValue } from "@prisma/client";
import ItemValue from "./item-value";
import { useEffect, useState } from "react";
import { genRandomString, swapItems } from "@/lib/utils";

interface ItemFieldProps {
    title: string;
    type: FieldType;
    value: FieldValue[];
}

function ItemField({ title, type, value }: ItemFieldProps) {
    const [fieldvalue, setFieldvalue] = useState<FieldValue[]>([]);

    useEffect(() => {
        setFieldvalue([...value]);
    }, []);

    function handleSwap(idx: number) {
        setFieldvalue((prevFields) => {
            const newFields = [...prevFields];
            return swapItems(newFields, idx);
        });
    }

    function handleDelete(key: string) {
        setFieldvalue((prevFields) => {
            const newFields = [...prevFields];
            return newFields.filter((f) => f.content !== key);
        });
    }

    function handleUpdate(key: string, value: string, idx: number) {
        setFieldvalue((prevField) => {
            const updatedFields = prevField.map((field, i) => {
                if (i === idx) {
                    return { ...field, [key]: value };
                }
                return field;
            });
            return updatedFields;
        });
    }

    return (
        <AccordionItem value={title}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent className="p-2">
                {fieldvalue.map((val, idx) => (
                    <ItemValue
                        key={genRandomString()}
                        idx={idx}
                        type={type}
                        fieldValue={val}
                        handleSwap={handleSwap}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                ))}
                <Button
                    onClick={(e) => setFieldvalue([...fieldvalue, { content: "", linkname: "", url: "" }])}
                    size="sm"
                    className="float-right my-4"
                >
                    + Add Instance
                </Button>
            </AccordionContent>
        </AccordionItem>
    );
}

export default ItemField;

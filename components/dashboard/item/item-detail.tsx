import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FieldType, FieldValue } from "@prisma/client";

interface ItemDetailProps {
    title: string;
    type: FieldType;
    value: FieldValue[];
}

function ItemDetail({ type, title, value }: ItemDetailProps) {
    return (
        <AccordionItem value={title}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent className="p-2">
                {value.map((val, idx) =>
                    type !== "source" ? (
                        <p key={idx}>{val.content}</p>
                    ) : (
                        <p key={idx}>
                            {val.linkname} - {val.url}
                        </p>
                    )
                )}
            </AccordionContent>
        </AccordionItem>
    );
}

export default ItemDetail;

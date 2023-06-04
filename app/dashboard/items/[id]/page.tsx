"use client";

import { Button } from "@/components/ui/button";
import useItem from "@/hooks/service/useItem";
import { ArrowLeft, Edit } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import ItemField from "@/components/dashboard/item/item-field";
import { useState } from "react";
import ItemDetail from "@/components/dashboard/item/item-detail";

function Item() {
    const router = useRouter();
    const params = useParams();
    const { getOneItem } = useItem();
    const [editing, setEditing] = useState(false);

    const { data: itemDetail, isLoading } = useQuery(["getOneItem", params.id], () => getOneItem(params.id), {
        enabled: !!params.id,
    });

    return (
        <>
            {isLoading && <p className="mt-2 text-center text-lg">Loading...</p>}
            {!isLoading && itemDetail?.data && (
                <>
                    <div className="flex flex-col w-full md:w-1/2 mt-8 mx-auto justify-center items-center">
                        <Image
                            src={itemDetail.data.image ?? "/img/logo.png"}
                            alt="item_image"
                            className="rounded-full"
                            width={180}
                            height={180}
                        />
                        <h2 className="font-bold text-2xl mt-4">{itemDetail.data.name}</h2>
                        <p className="text-lg">{itemDetail.data.category?.name}</p>
                        <Accordion type="multiple" className="w-full mt-8">
                            {itemDetail.data.fields.map((field, idx) =>
                                editing ? (
                                    <ItemField key={idx} title={field.title} type={field.type} value={field.value} />
                                ) : (
                                    <ItemDetail key={idx} title={field.title} type={field.type} value={field.value} />
                                )
                            )}
                        </Accordion>
                    </div>
                    <Button
                        onClick={() => router.back()}
                        variant="ghost"
                        size="sm"
                        className="absolute flex items-center w-fit top-3 left-3"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back
                    </Button>
                    <Button
                        onClick={() => setEditing((prev) => !prev)}
                        size="sm"
                        variant={editing ? "outline" : "default"}
                        className="absolute flex items-center w-fit top-3 right-9 px-4"
                    >
                        <Edit className="w-4 h-4 mr-2" /> {editing ? "Editing..." : "Edit"}
                    </Button>
                </>
            )}
        </>
    );
}

export default Item;

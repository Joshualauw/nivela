"use client";

import { useTitleStore } from "@/store/useTitleStore";
import { useEffect } from "react";

interface CategoryParams {
    params: { category: string };
}

function Category({ params }: CategoryParams) {
    const { title, setTitle } = useTitleStore();

    useEffect(() => {
        setTitle(params.category);
    }, []);

    return <div>This is {title}</div>;
}

export default Category;

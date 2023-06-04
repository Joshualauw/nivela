import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/db";
import { Item } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    const searchParams = request.nextUrl.searchParams;

    let query = {};
    const projectId = searchParams.get("projectId");
    if (projectId) Object.assign(query, { projectId: projectId });

    try {
        const items = await prisma.item.findMany({ where: query, include: { category: true, project: true } });
        const groupedItems: { [key: string]: Item[] } = items.reduce((result, item) => {
            const { category } = item;
            if (category) {
                //@ts-ignore
                if (!result[category.name]) {
                    //@ts-ignore
                    result[category.name] = [];
                }
                //@ts-ignore
                result[category.name].push(item);
            }
            return result;
        }, {});

        return NextResponse.json({ data: groupedItems, message: "items fetched successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

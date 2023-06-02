import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/db";
import { uploadFile } from "@/lib/fileUpload";
import { exclude } from "@/lib/utils";
import { validator } from "@/lib/validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    const searchParams = request.nextUrl.searchParams;

    let query = {};
    const projectId = searchParams.get("projectId");
    const categoryId = searchParams.get("categoryId");

    if (projectId) Object.assign(query, { projectId: projectId });
    if (categoryId) Object.assign(query, { categoryId: categoryId });

    try {
        const items = await prisma.item.findMany({ where: query });

        return NextResponse.json({ data: items, message: "items fetched successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

const createItemSchema = z.object({
    name: z.string().min(3),
    image: z.any().optional(),
    projectId: z.string(),
    categoryId: z.string(),
    fields: z
        .array(
            z.object({
                title: z.string().min(3),
                type: z.enum(["text", "textarea", "source"]),
                value: z
                    .array(z.any())
                    .nullish()
                    .transform((val) => {
                        if (!val) return [];
                        return val;
                    }),
            })
        )
        .min(1),
});
export type CreateItemDto = z.infer<typeof createItemSchema>;

export async function POST(request: NextRequest) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    const body = (await request.json()) as CreateItemDto;

    let { errors } = validator(createItemSchema, body);
    if (errors.length > 0) return NextResponse.json({ message: "validation failed", errors }, { status: 400 });

    try {
        const item = await prisma.item.create({ data: exclude(body, ["image"]) });
        if (body.image) {
            const { url } = await uploadFile(body.image, `items/${item.id}`);
            await prisma.item.update({ where: { id: item.id }, data: { image: url } });
            item.image = url;
        }

        return NextResponse.json({ data: item, message: "item created successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

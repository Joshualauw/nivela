import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/db";
import { deleteFile, uploadFile } from "@/lib/fileUpload";
import { exclude } from "@/lib/utils";
import { validator } from "@/lib/validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    try {
        const item = await prisma.item.findFirst({
            where: { id: params.id },
            include: { category: true, project: true },
        });
        if (!item) return NextResponse.json({ message: "item not found" }, { status: 404 });

        return NextResponse.json({ data: item, message: "item fetched successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

const updateItemSchema = z.object({
    name: z.string().min(3),
    image: z.any().optional(),
    categoryId: z.string(),
    fields: z
        .array(
            z.object({
                title: z.string().min(3),
                type: z.enum(["text", "textarea", "source"]),
                value: z.array(z.any()).optional().default([]),
            })
        )
        .min(1),
});
export type UpdateItemDto = z.infer<typeof updateItemSchema>;

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    const body = (await request.json()) as UpdateItemDto;

    let { errors } = validator(updateItemSchema, body);
    if (errors.length > 0) return NextResponse.json({ message: "validation failed", errors }, { status: 400 });

    try {
        const item = await prisma.item.update({ where: { id: params.id }, data: exclude(body, ["image"]) });
        if (body.image) {
            const { url } = await uploadFile(body.image, `items/${item.id}`);
            await prisma.item.update({ where: { id: item.id }, data: { image: url } });
            item.image = url;
        }

        return NextResponse.json({ data: item, message: "item updated successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    try {
        const item = await prisma.item.delete({
            where: { id: params.id },
        });
        if (item.image) await deleteFile(`items/${item.id}`);

        return NextResponse.json({ data: item, message: "item deleted successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

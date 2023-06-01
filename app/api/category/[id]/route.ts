import { isAuthenticated } from "@/lib/auth";
import { validator } from "@/lib/validator";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    try {
        const category = await prisma.category.findFirst({
            where: { id: params.id },
            include: { items: true, project: true },
        });
        if (!category) return NextResponse.json({ message: "category not found" }, { status: 404 });

        return NextResponse.json({ data: category, message: "category fetched successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

const updateCategorySchema = z.object({
    name: z.string().min(3),
    icon: z.string().min(1),
});

export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    const body = (await request.json()) as UpdateCategoryDto;

    let { errors } = validator(updateCategorySchema, body);
    if (errors.length > 0) return NextResponse.json({ message: "validation failed", errors }, { status: 400 });

    try {
        const category = await prisma.category.update({ where: { id: params.id }, data: body });

        return NextResponse.json({ data: category, message: "category updated successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    try {
        const [category] = await prisma.$transaction([
            prisma.category.delete({ where: { id: params.id } }),
            prisma.item.deleteMany({ where: { categoryId: params.id } }),
        ]);

        return NextResponse.json({ data: category, message: "category deleted successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

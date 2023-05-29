import { isAuthenticated } from "@/lib/auth";
import { validator } from "@/lib/validator";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    const searchParams = request.nextUrl.searchParams;
    let query = {};
    if (searchParams.get("projectId")) {
        Object.assign(query, { projectId: searchParams.get("projectId") });
    }

    try {
        const categories = await prisma.category.findMany({ where: query });

        return NextResponse.json({ data: categories, message: "categories fetched successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

const createCategorySchema = z.object({
    name: z.string(),
    projectId: z.string(),
    icon: z.string(),
});

type CreateCategoryDto = z.infer<typeof createCategorySchema>;

export async function POST(request: NextRequest) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    const body = (await request.json()) as CreateCategoryDto;

    let { errors } = validator(createCategorySchema, body);
    if (errors.length > 0) return NextResponse.json({ message: "validation failed", errors }, { status: 400 });

    try {
        const category = await prisma.category.create({ data: body });

        return NextResponse.json({ data: category, message: "category created successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

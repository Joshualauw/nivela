import { isAuthenticated } from "@/lib/auth";
import { uploadFile } from "@/lib/fileUpload";
import { validator } from "@/lib/validator";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { exclude } from "@/lib/utils";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const loggedUser = await isAuthenticated(request);
        if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

        const searchParams = request.nextUrl.searchParams;
        let query = {};
        if (searchParams.get("userId")) {
            Object.assign(query, { userId: searchParams.get("userId") });
        }

        const projects = await prisma.project.findMany({
            where: query,
            include: {
                _count: { select: { templates: true, categories: true, items: true } },
            },
        });

        return NextResponse.json({ data: projects, message: "projects fetched successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

const createProjectSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    image: z.any().optional(),
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export async function POST(request: NextRequest) {
    try {
        const loggedUser = await isAuthenticated(request);
        if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

        const formData = await request.formData();
        const body = Object.fromEntries(formData) as CreateProjectDto;

        let { errors } = validator(createProjectSchema, body);
        if (errors.length > 0) return NextResponse.json({ message: "validation failed", errors }, { status: 400 });

        const project = await prisma.project.create({ data: { ...exclude(body, ["image"]), userId: loggedUser.id } });
        if (body.image) {
            const { url } = await uploadFile(body.image, `projects/${project.id}`);
            await prisma.project.update({ where: { id: project.id }, data: { image: url } });
            project.image = url;
        }

        return NextResponse.json({ data: project, message: "project created successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

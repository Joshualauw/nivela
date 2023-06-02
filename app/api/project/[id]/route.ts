import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";
import { exclude } from "@/lib/utils";
import { validator } from "@/lib/validator";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { deleteFile, uploadFile } from "@/lib/fileUpload";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    try {
        const project = await prisma.project.findFirst({
            where: { id: params.id },
            include: { templates: true, categories: true, user: true },
        });
        if (!project) return NextResponse.json({ message: "project not found" }, { status: 404 });

        return NextResponse.json({ data: project, message: "project fetched successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

const updateProjectSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.any().optional(),
});

export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    const body = (await request.json()) as UpdateProjectDto;

    let { errors } = validator(updateProjectSchema, body);
    if (errors.length > 0) return NextResponse.json({ message: "validation failed", errors }, { status: 400 });

    try {
        const project = await prisma.project.update({
            where: { id: params.id },
            data: exclude(body, ["image"]),
        });
        if (body.image) {
            const { url } = await uploadFile(body.image, `projects/${project.id}`);
            await prisma.project.update({ where: { id: project.id }, data: { image: url } });
            project.image = url;
        }

        return NextResponse.json({ data: project, message: "project updated successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    try {
        const [, , items, , project] = await prisma.$transaction([
            prisma.category.deleteMany({ where: { projectId: params.id } }),
            prisma.template.deleteMany({ where: { projectId: params.id } }),
            prisma.item.findMany({ where: { projectId: params.id } }),
            prisma.item.deleteMany({ where: { projectId: params.id } }),
            prisma.project.delete({ where: { id: params.id } }),
        ]);
        if (project.image) await deleteFile(`projects/${project.id}`);
        for (let i = 0; i < items.length; i++) {
            await deleteFile(`items/${items[i].id}`);
        }

        return NextResponse.json({ data: project, message: "project deleted successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

import { isAuthenticated } from "@/lib/auth";
import { validator } from "@/lib/validator";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    try {
        const template = await prisma.template.findFirst({
            where: { id: params.id },
            include: { project: true },
        });
        if (!template) return NextResponse.json({ message: "template not found" }, { status: 404 });

        return NextResponse.json({ data: template, message: "template fetched successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

const updateTemplateSchema = z.object({
    name: z.string(),
    fields: z.array(
        z.object({
            title: z.string(),
            type: z.enum(["text", "textarea", "source"]),
            value: z
                .object({
                    content: z.string().optional(),
                    linkname: z.string().optional(),
                    url: z.string().optional(),
                })
                .optional(),
        })
    ),
});

type UpdateTemplateDto = z.infer<typeof updateTemplateSchema>;

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    const body = (await request.json()) as UpdateTemplateDto;

    let { errors } = validator(updateTemplateSchema, body);
    if (errors.length > 0) return NextResponse.json({ message: "validation failed", errors }, { status: 400 });

    try {
        const template = await prisma.template.update({ where: { id: params.id }, data: body });

        return NextResponse.json({ data: template, message: "template updated successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    try {
        const template = await prisma.template.delete({ where: { id: params.id } });

        return NextResponse.json({ data: template, message: "template deleted successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

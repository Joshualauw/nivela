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
        const templates = await prisma.template.findMany({ where: query });

        return NextResponse.json({ data: templates, message: "templates fetched successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

const createTemplateSchema = z.object({
    name: z.string(),
    projectId: z.string(),
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

type CreateTemplateDto = z.infer<typeof createTemplateSchema>;

export async function POST(request: NextRequest) {
    const loggedUser = await isAuthenticated(request);
    if (!loggedUser) return NextResponse.json({ message: "unauthenticated" }, { status: 401 });

    const body = (await request.json()) as CreateTemplateDto;

    let { errors } = validator(createTemplateSchema, body);
    if (errors.length > 0) return NextResponse.json({ message: "validation failed", errors }, { status: 400 });

    try {
        //@ts-ignore: expect-zod-prisma-enumType
        const template = await prisma.template.create({ data: body });

        return NextResponse.json({ data: template, message: "template created successfully" });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

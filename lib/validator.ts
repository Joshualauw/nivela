import { ZodSchema } from "zod";

export function validator(schema: ZodSchema, data: any) {
    let errors: string[] = [];

    const validated = schema.safeParse(data);
    if (!validated.success) {
        errors.push(...validated.error.issues.map((iss) => iss.path + " " + iss.message));
    }

    return { success: validated.success, errors };
}

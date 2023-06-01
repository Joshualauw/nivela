import { Project, Template } from "@prisma/client";

export type TemplateDetail =
    | (Template & {
          project: Project;
      })
    | null;

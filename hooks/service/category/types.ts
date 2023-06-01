import { Category, Item, Project } from "@prisma/client";

export type CategoryDetail =
    | (Category & {
          items: Item[];
          project: Project;
      })
    | null;

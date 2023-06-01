import { Category, Project, Template, User } from "@prisma/client";

export type ProjectCards = (Project & {
    _count: {
        templates: number;
        categories: number;
        items: number;
    };
})[];

export type ProjectDetail =
    | (Project & {
          user: User;
          templates: Template[];
          categories: Category[];
      })
    | null;

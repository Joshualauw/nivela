import { Category, Project, Template, User } from "@prisma/client";

export type ProjectCards = (Project & {
    categories: (Category & {
        _count: {
            items: number;
        };
    })[];
    _count: {
        templates: number;
        categories: number;
    };
})[];

export type ProjectDetail =
    | (Project & {
          user: User;
          templates: Template[];
          categories: Category[];
      })
    | null;

import { Category, Item, Project, Template, User } from "@prisma/client";

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export interface ApiResponse<T> {
    data: T;
    message: string;
}

export interface ErrorResponse {
    code: number;
    detail: {
        errors: string[];
        message: string;
    };
}

export type CategoryDetail =
    | (Category & {
          items: Item[];
          project: Project;
      })
    | null;

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

export type TemplateDetail =
    | (Template & {
          project: Project;
      })
    | null;

export type ItemDetail =
    | (Item & {
          category: Category | null;
          project: Project | null;
      })
    | null;

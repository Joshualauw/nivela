import { ApiResponse } from "@/types";
import { Category, Project } from "@prisma/client";

export type ProjectCards = ApiResponse<
    (Project & {
        categories: (Category & {
            _count: {
                items: number;
            };
        })[];
        _count: {
            templates: number;
            categories: number;
        };
    })[]
>;

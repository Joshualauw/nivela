import { CreateProjectDto } from "@/app/api/project/route";
import { ApiResponse } from "@/types/index";
import { Project } from "@prisma/client";
import { axiosError } from "../../../lib/utils";
import { ProjectCards } from "./types";
import axios from "axios";

function useProject() {
    return {
        getAllProjects: async (query: { userId?: string } = {}) => {
            try {
                const res = await axios.get<ProjectCards>("/api/project", { params: query });

                return res.data.data.map((dt) => ({
                    id: dt.id,
                    image: dt.image,
                    name: dt.name,
                    template_count: dt._count.templates,
                    category_count: dt._count.categories,
                    items_count: dt.categories.reduce((total, cur) => total + cur._count.items, 0),
                }));
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        addProject: async (payload: CreateProjectDto): Promise<ApiResponse<Project>> => {
            const formData = new FormData();
            formData.append("name", payload.name);
            formData.append("description", payload.description);
            if (payload.image) formData.append("image", payload.image);

            try {
                const res = await axios.post("/api/project", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },
    };
}

export default useProject;

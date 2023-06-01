import { CreateProjectDto } from "@/app/api/project/route";
import { ApiResponse } from "@/types/index";
import { Project } from "@prisma/client";
import { axiosError } from "../../../lib/utils";
import { ProjectCards, ProjectDetail } from "./types";
import axios from "axios";
import { UpdateProjectDto } from "@/app/api/project/[id]/route";

function useProject() {
    const BASE_API = "/api/project";

    return {
        getAllProjects: async (query: { userId?: string } = {}) => {
            try {
                const res = await axios.get<ApiResponse<ProjectCards>>(BASE_API, { params: query });

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

        getOneProject: async (id: string) => {
            try {
                const res = await axios.get<ApiResponse<ProjectDetail>>(`${BASE_API}/${id}`);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        addProject: async (payload: CreateProjectDto) => {
            const formData = new FormData();
            formData.append("name", payload.name);
            formData.append("description", payload.description);
            if (payload.image) formData.append("image", payload.image);

            try {
                const res = await axios.post<ApiResponse<Project>>(BASE_API, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        updateProject: async (payload: UpdateProjectDto & { id: string }) => {
            const formData = new FormData();
            formData.append("name", payload.name);
            formData.append("description", payload.description);
            if (payload.image) formData.append("image", payload.image);

            try {
                const res = await axios.put<ApiResponse<Project>>(`${BASE_API}/${payload.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        deleteProject: async (payload: { id: string }) => {
            try {
                const res = await axios.delete<ApiResponse<Project>>(`${BASE_API}/${payload.id}`);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },
    };
}

export default useProject;

import { CreateProjectDto } from "@/app/api/project/route";
import { ApiResponse, ProjectCards, ProjectDetail } from "@/types/index";
import { Project } from "@prisma/client";
import { axiosError, blobToBase64, exclude } from "../../lib/utils";
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
                    items_count: dt._count.items,
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
            const body = { ...payload };
            if (payload.image) {
                const image = await blobToBase64(payload.image);
                Object.assign(body, { image });
            }

            try {
                const res = await axios.post<ApiResponse<Project>>(BASE_API, body);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        updateProject: async (payload: UpdateProjectDto & { id: string }) => {
            const body = { ...payload };
            if (payload.image) {
                const image = await blobToBase64(payload.image);
                Object.assign(body, { image });
            }

            try {
                const res = await axios.put<ApiResponse<Project>>(`${BASE_API}/${payload.id}`, exclude(body, ["id"]));
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

import { UpdateCategoryDto } from "@/app/api/category/[id]/route";
import { CreateCategoryDto } from "@/app/api/category/route";
import { CreateTemplateDto } from "@/app/api/template/route";
import { axiosError, exclude } from "@/lib/utils";
import { ApiResponse } from "@/types";
import { Category, Template } from "@prisma/client";
import axios from "axios";
import { TemplateDetail } from "./types";
import { UpdateTemplateDto } from "@/app/api/template/[id]/route";

function useTemplate() {
    const BASE_API = "/api/template";

    return {
        getAllTemplate: async (projectId: string) => {
            try {
                const res = await axios.get<ApiResponse<Template[]>>(BASE_API, { params: { projectId } });
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        getOneTemplate: async (id: string) => {
            try {
                const res = await axios.get<ApiResponse<TemplateDetail>>(`${BASE_API}/${id}`);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        addTemplate: async (payload: CreateTemplateDto) => {
            try {
                const res = await axios.post<ApiResponse<Template>>(BASE_API, payload);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        updateTemplate: async (payload: UpdateTemplateDto & { id: string }) => {
            try {
                const res = await axios.put<ApiResponse<Template>>(
                    `${BASE_API}/${payload.id}`,
                    exclude(payload, ["id"])
                );
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        deleteTemplate: async (payload: { id: string }) => {
            try {
                const res = await axios.delete<ApiResponse<Template>>(`${BASE_API}/${payload.id}`);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },
    };
}

export default useTemplate;

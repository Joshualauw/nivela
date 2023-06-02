import { UpdateCategoryDto } from "@/app/api/category/[id]/route";
import { CreateCategoryDto } from "@/app/api/category/route";
import { axiosError, exclude } from "@/lib/utils";
import { ApiResponse, CategoryDetail } from "@/types";
import { Category } from "@prisma/client";
import axios from "axios";

function useCategory() {
    const BASE_API = "/api/category";

    return {
        getAllCategory: async (projectId: string) => {
            try {
                const res = await axios.get<ApiResponse<Category[]>>(BASE_API, { params: { projectId } });
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        getOneCategory: async (id: string) => {
            try {
                const res = await axios.get<ApiResponse<CategoryDetail>>(`${BASE_API}/${id}`);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        addCategory: async (payload: CreateCategoryDto) => {
            try {
                const res = await axios.post<ApiResponse<Category>>(BASE_API, payload);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        updateCategory: async (payload: UpdateCategoryDto & { id: string }) => {
            try {
                const res = await axios.put<ApiResponse<Category>>(
                    `${BASE_API}/${payload.id}`,
                    exclude(payload, ["id"])
                );
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        deleteCategory: async (payload: { id: string }) => {
            try {
                const res = await axios.delete<ApiResponse<Category>>(`${BASE_API}/${payload.id}`);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },
    };
}

export default useCategory;

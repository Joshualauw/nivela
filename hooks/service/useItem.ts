import { CategoryItems } from "./../../types/index.d";
import { UpdateItemDto } from "@/app/api/item/[id]/route";
import { CreateItemDto } from "@/app/api/item/route";
import { axiosError, blobToBase64, exclude } from "@/lib/utils";
import { ApiResponse, ItemDetail } from "@/types";
import { Item } from "@prisma/client";
import axios from "axios";

function useItem() {
    const BASE_API = "/api/item";

    return {
        getAllItem: async (projectId: string, categoryId: string) => {
            try {
                const res = await axios.get<ApiResponse<Item[]>>(BASE_API, { params: { projectId, categoryId } });
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        getCategoryitems: async (projectId: string) => {
            try {
                const res = await axios.get<ApiResponse<{ [key: string]: CategoryItems }>>(`${BASE_API}/category`, {
                    params: { projectId },
                });
                return Object.entries(res.data.data).map(([category, items]) => ({
                    category,
                    items: items.map((item) => ({ name: item.name, url: `/dashboard/items/${item.id}` })),
                }));
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        getOneItem: async (id: string) => {
            try {
                const res = await axios.get<ApiResponse<ItemDetail>>(`${BASE_API}/${id}`);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        addItem: async (payload: CreateItemDto) => {
            try {
                const body = { ...payload };
                if (payload.image) {
                    const image = await blobToBase64(payload.image);
                    Object.assign(body, { image });
                }
                const res = await axios.post<ApiResponse<Item>>(BASE_API, body);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        updateItem: async (payload: UpdateItemDto & { id: string }) => {
            try {
                const body = { ...payload };
                if (payload.image) {
                    const image = await blobToBase64(payload.image);
                    Object.assign(body, { image });
                }
                const res = await axios.put<ApiResponse<Item>>(`${BASE_API}/${payload.id}`, exclude(body, ["id"]));
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },

        deleteItem: async (payload: { id: string }) => {
            try {
                const res = await axios.delete<ApiResponse<Item>>(`${BASE_API}/${payload.id}`);
                return res.data;
            } catch (err: any) {
                throw new Error(axiosError(err));
            }
        },
    };
}

export default useItem;

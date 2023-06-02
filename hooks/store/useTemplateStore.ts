import { Field } from "@prisma/client";
import { create } from "zustand";

interface TemplateState {
    templateFields: Field[];
    setTemplateFields: (fields: Field[]) => void;
}

export const useTemplateStore = create<TemplateState>()((set) => ({
    templateFields: [],
    setTemplateFields: (fields) => set({ templateFields: [...fields] }),
}));

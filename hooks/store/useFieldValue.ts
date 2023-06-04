import { create } from "zustand";

interface FieldValueState {
    content: string;
    setContent: (val: string) => void;
    linkName: string;
    setLinkName: (val: string) => void;
    url: string;
    setUrl: (val: string) => void;
}

export const useFieldValue = create<FieldValueState>()((set) => ({
    content: "",
    setContent: (val) => set({ content: val }),
    linkName: "",
    setLinkName: (val) => set({ linkName: val }),
    url: "",
    setUrl: (val) => set({ url: val }),
}));

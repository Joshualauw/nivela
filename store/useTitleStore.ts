import { create } from "zustand";

interface TitleState {
    title: string;
    setTitle: (str: string) => void;
}

export const useTitleStore = create<TitleState>()((set) => ({
    title: "Dashboard",
    setTitle: (str) => set({ title: str }),
}));

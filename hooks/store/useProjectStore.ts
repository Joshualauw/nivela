import { ProjectDetail } from "@/types";
import { create } from "zustand";

interface ProjectState {
    projectDetail: ProjectDetail | null;
    setProjectDetail: (detail: ProjectDetail | null) => void;
}

export const useProjectStore = create<ProjectState>()((set) => ({
    projectDetail: null,
    setProjectDetail: (detail) => set({ projectDetail: detail }),
}));

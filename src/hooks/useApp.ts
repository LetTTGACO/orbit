import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Actions = {
  addTask: (title: string, description?: string) => void;
};

export const useTaskStore = create<Actions>()(
  persist(
    (set) => ({
      tasks: [],
      columns: [],
      draggedTask: null,
      addTask: (title: string, description?: string) => set((state) => ({})),
      addCol: (title: string) => set((state) => ({})),
    }),
    { name: "task-store", skipHydration: true },
  ),
);

import { create } from "zustand"

// Store Interface
interface AppState {
    isDeleteModalOpen: boolean
    setIsDeleteModalOpen: (open: boolean) => void

    fieldId: string | null
    setFieldId: (fieldId: string) => void
}

// Create function creates a global store.
export const useAppStore = create<AppState>((set) => ({
    // Reducer
    fieldId: null,
    setFieldId: (fieldId: string) => set((state) => ({ fieldId })),

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open) => set((state) => ({ isDeleteModalOpen: open }))

}))
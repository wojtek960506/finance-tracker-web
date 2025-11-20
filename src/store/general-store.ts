import { create } from 'zustand';
import { persist } from "zustand/middleware";

type GeneralState = {
  accessToken: string | null;
  language: string;
  _hasHydrated: boolean;

  // actions
  setAccessToken: (accessToken: string | null) => void;
  setLanguage: (language: string) => void;
  setHasHydrated: (v: boolean) => void;
}

const initialGeneralState: Omit<
  GeneralState,
  "setAccessToken" |
  "setLanguage" |
  "setHasHydrated"
> = {
  accessToken: null,
  language: "en",
  _hasHydrated: false,
}

export const useGeneralStore = create<GeneralState>()(
  persist(
    (set) => ({
      ...initialGeneralState,

      setAccessToken: (accessToken: string | null) => set({ accessToken }),
      setLanguage: (language: string) => set({language}),

      // hydration tracking
      setHasHydrated: (v: boolean) => set({ _hasHydrated: v}),
    }),
    {
      name: "general-store",
      partialize: (state) => ({
        accessToken: state.accessToken,
        language: state.language,
      }),

      // called when hydration completes
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )  
  
);

export const resetGeneralStore = () => useGeneralStore.setState(initialGeneralState);

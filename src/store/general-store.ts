import { create } from 'zustand';
import { persist } from "zustand/middleware";

type GeneralState = {
  accessToken: string | null;
  language: string;

  // actions
  setAccessToken: (accessToken: string | null) => void;
  setLanguage: (language: string) => void;
}

const initialGeneralState: Omit<
  GeneralState,
  "setAccessToken" |
  "setLanguage"
> = {
  accessToken: null,
  language: "en", 
}

export const useGeneralStore = create<GeneralState>()(
  persist(
    (set) => ({
      ...initialGeneralState,

      setAccessToken: (accessToken: string | null) => set({ accessToken }),
      setLanguage: (language: string) => set({language}),
    }),
    {
      name: "general-store",
      partialize: (state) => ({
        accessToken: state.accessToken,
        language: state.language,
      })
    }
  )  
  
);

export const resetGeneralStore = () => useGeneralStore.setState(initialGeneralState);

import { create } from 'zustand';
import { persist } from "zustand/middleware";

type GeneralState = {
  accessToken: string | null;
  language: string;
  _hasHydrated: boolean;
  isLoggingOut: boolean;

  // actions
  setAccessToken: (accessToken: string | null) => void;
  setLanguage: (language: string) => void;
  setHasHydrated: (v: boolean) => void;
  setIsLoggingOut: (isLoggingOut: boolean) => void;
}

const initialGeneralState: Omit<
  GeneralState,
  "setAccessToken" |
  "setLanguage" |
  "setHasHydrated" |
  "setIsLoggingOut"
> = {
  accessToken: null,
  language: "en",
  _hasHydrated: false,
  isLoggingOut: false,
}

export const useGeneralStore = create<GeneralState>()(
  persist(
    (set) => ({
      ...initialGeneralState,

      setAccessToken: (accessToken: string | null) => set({ accessToken }),
      setLanguage: (language: string) => set({language}),
      // hydration tracking
      setHasHydrated: (v: boolean) => set({ _hasHydrated: v}),
      setIsLoggingOut: (isLoggingOut: boolean) => set({ isLoggingOut }),
    }),
    {
      name: "general-store",
      partialize: (state) => ({
        accessToken: state.accessToken,
        language: state.language,
      }),

      // called when hydration completes
      onRehydrateStorage: () => (persistedState) => {
        persistedState?.setHasHydrated(true);
      }
    }
  )  
  
);

export const resetGeneralStore = () => useGeneralStore.setState(initialGeneralState);

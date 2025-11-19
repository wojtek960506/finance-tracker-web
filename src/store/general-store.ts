import { create } from 'zustand';

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

export const useGeneralStore = create<GeneralState>((set) => ({
  ...initialGeneralState,

  setAccessToken: (accessToken: string | null) => set({ accessToken }),
  setLanguage: (language: string) => set({language}),
}));

export const resetGeneralStore = () => useGeneralStore.setState(initialGeneralState);

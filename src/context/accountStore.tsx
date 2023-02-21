import { create } from "zustand";

export interface AccountData {
  token?: string;
  user?: {
    avatar: string;
    handle: string;
    name: string;
  };
}

interface AccountStore {
  data: AccountData;
  setData(_data: AccountData): void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  data: {},
  setData: (data) => set({ data }),
}));

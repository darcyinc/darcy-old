import { createSignal } from 'solid-js';

export interface AccountData {
  token?: string;
  user?: {
    avatar: string;
    handle: string;
    name: string;
  };
}

// eslint-disable-next-line solid/reactivity
export const useAccountStore = () => createSignal<AccountData>({});

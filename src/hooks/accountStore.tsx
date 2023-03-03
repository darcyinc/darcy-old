import { createSignal } from 'solid-js';

export interface AccountData {
  token?: string;
  user?: {
    avatar: string;
    handle: string;
    name: string;
  };
}

const [signal, setSignal] = createSignal<AccountData>({});

export const useAccountStore = () => [signal, setSignal] as const;

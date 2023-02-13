import { createContext, useState } from "react";

export interface AccountData {
  token?: string;
  user?: {
    avatar?: string;
    handle: string;
    name: string;
  };
}

export interface AccountContextProps {
  data: AccountData;
  setData: (_data: AccountData) => void;
}

export const AccountContext = createContext({} as AccountContextProps);

export default function AccountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState({} as AccountData);

  return (
    <AccountContext.Provider value={{ data, setData }}>
      {children}
    </AccountContext.Provider>
  );
}

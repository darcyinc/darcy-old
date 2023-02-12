import { createContext, useState } from "react";

interface Account {
  token?: string;
  user?: {
    avatar?: string;
    handle: string;
    name: string;
  };
}

interface AccountContextProps {
  data: Account;
  setData: (_data: Account) => void;
}

export const AccountContext = createContext({} as AccountContextProps);

export default function AccountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState({} as Account);

  return (
    <AccountContext.Provider value={{ data, setData }}>
      {children}
    </AccountContext.Provider>
  );
}

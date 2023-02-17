import { createContext, useMemo, useState } from "react";

type FeedSorterContextProps = {
  data: string;
  setData(_data: string): void;
};

export const FeedSorterContext = createContext({} as FeedSorterContextProps);

export default function FeedSorterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState("popular");

  const value = useMemo(() => ({ data, setData }), [data, setData]);

  return (
    <FeedSorterContext.Provider value={value}>
      {children}
    </FeedSorterContext.Provider>
  );
}

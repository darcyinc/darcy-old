import { createContext, useState } from "react";

interface FeedSorterContextProps {
  data: string;
  setData: (data: string) => void;
}

export const FeedSorterContext = createContext({} as FeedSorterContextProps);

export default function FeedSorterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState("popular");

  return (
    <FeedSorterContext.Provider value={{ data, setData }}>
      {children}
    </FeedSorterContext.Provider>
  );
}

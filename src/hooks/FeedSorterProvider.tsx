import { createContext, useState } from "react";

export const FeedSorterContext = createContext({
  data: "popular",
  setData: (_: string) => {},
});

export default function FeedSorterProvider({children}: {children: React.ReactNode}) {
  const [data, setData] = useState("popular");

  return (
    <FeedSorterContext.Provider value={{ data, setData }}>
      {children}
    </FeedSorterContext.Provider>
  );
}
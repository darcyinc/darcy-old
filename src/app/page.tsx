import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";

export default function Home() {
  if (typeof window === "undefined") return <></>;

  return (
    <>
      <Navbar />
      <Feed />
    </>
  );
}

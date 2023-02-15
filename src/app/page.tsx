import dynamic from "next/dynamic";

const Feed = dynamic(() => import("@/components/Feed"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const ValidUserCheck = dynamic(() => import("@/components/ValidUserCheck"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <ValidUserCheck redirectToIfNotLogged="/login" />
      <Navbar active="feed" />
      <Feed />
    </>
  );
}

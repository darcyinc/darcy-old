import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";
import ValidUserCheck from "@/components/ValidUserCheck";

export default function Home() {
  return (
    <>
      <ValidUserCheck redirectToIfNotLogged="/login" />
      <Navbar active="feed" />
      <Feed />
    </>
  );
}

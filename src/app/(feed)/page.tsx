import dynamic from "next/dynamic";
import "./globals.scss";

const Feed = dynamic(async () => import("@/components/Feed"), { ssr: false });
const ValidUserCheck = dynamic(
  async () => import("@/components/ValidUserCheck"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <ValidUserCheck redirectToIfNotLogged="/auth/login" />
      <Feed />
    </>
  );
}

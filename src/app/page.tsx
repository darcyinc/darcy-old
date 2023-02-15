import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";
import ValidUserCheck from "@/components/ValidUserCheck";

export default function Home() {
  // const account = useContext(AccountContext);
  // const router = useRouter();

  // useEffect(() => {
  //   const currentToken = localStorage.getItem("token") ?? account.data?.token;
  //   if (!currentToken) {
  //     router.replace("/login");
  //     return;
  //   }

  //   getUserFromToken(currentToken)
  //     .then(account.setData)
  //     .catch(() => {
  //       localStorage.removeItem("token");
  //       account.setData({});
  //       return router.replace("/login");
  //     });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps -- Prevent infinite re-render
  // }, []);

  return (
    <>
      <ValidUserCheck redirectToIfNotLogged="/login" />
      <Navbar active="feed" />
      <Feed />
    </>
  );
}

import { SignIn, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";

export default function AuthLayout(props: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  const loading = usePageLoader();
  const [token, setToken] = useState<null | string>(null);
  const { getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function setTheToken() {
      setToken(await getToken());
    }
    setTheToken();
  }, [isSignedIn]);
  useEffect(() => {}, [token]);

  if (!isLoaded) return <></>;
  if (!isSignedIn)
    return (
      <div className={`flex min-h-[100svh] flex-col items-center`}>
        <Header />
        <NavBar />
        <div className="w-[96vw] px-[2vw]">
          <SignIn routing="virtual" afterSignInUrl={router.asPath} />
        </div>
        <Footer />
      </div>
    );

  return (
    <div className={`flex min-h-[100svh] flex-col items-center`}>
      <Header />
      <NavBar />
      <div className="w-[96vw] px-[2vw]">
        {loading && <Loader />}
        {!loading && props.children}
      </div>
      <Footer />
    </div>
  );
}

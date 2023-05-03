import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SignIn, useAuth, useUser } from "@clerk/nextjs";

import css from "./AuthLayout.module.css"
import { useSideNav } from "../Nav/NavContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";
import usePageLoader from "../../hooks/usePageLoader";

export default function AuthLayout(props: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  const loading = usePageLoader()
  const [token, setToken] = useState<null | string>(null)
  const { getToken } = useAuth()

  const { sideNavVisible } = useSideNav();
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const subBodyStyle: CSSProperties = {
    overflow: "hidden",
    width:
      sideNavVisible
        ? "calc(100vw - 130px)"
        : windowWidth && windowWidth <= 450
          ? "100vw"
          : "calc(100vw - 130px)",
  };

  const boxStyle = {
    width:
      sideNavVisible
        ? "calc(100vw - 150px)"
        : windowWidth && windowWidth <= 450
          ? "95vw"
          : "",
  }

  const router = useRouter()
  useEffect(() => {
    async function setTheToken() {
      setToken(await getToken())
    }
    setTheToken()
  }, [isSignedIn])
  useEffect(() => {
  }, [token])
  if (!isLoaded)
    return <></>
  if (!isSignedIn)
    return (
      <div className={css.body}>
        <Header />
        <NavBar />
        <div className={css.subBody} style={subBodyStyle}>
          <div className={css.box} style={boxStyle}>
            <SignIn routing="virtual" afterSignInUrl={router.asPath} />
          </div>
        </div>
        <Footer />
      </div>
    )
  return <div className={css.body}>
    <Header />
    <NavBar />
    <div className={css.subBody} style={subBodyStyle}>
      {loading && <Loader />}
      {!loading && props.children}
    </div>
    <Footer />
  </div>

}
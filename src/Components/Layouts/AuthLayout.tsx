import { SignIn, useAuth, useUser } from "@clerk/nextjs";
import { Dialog, Modal } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";
import index from "./AuthLayout.module.css"

export default function AuthLayout(props: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();
  const loading = usePageLoader()
  const [token, setToken] = useState<null | string>(null)
  const { getToken } = useAuth()

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
      <div className={index.body}>
        <Header />
        <NavBar />
        <div className={index.subBody}>
          <div className={index.box}>
            <SignIn routing="virtual" afterSignInUrl={router.asPath} />
          </div>
        </div>
        <Footer />
      </div>
    )
  return <div className={index.body}>
    <Header />
    <NavBar />
    {/* {!isSignedIn &&  <Dialog open={true}>
      <SignIn afterSignInUrl={router.asPath}/>
     </Dialog>
    } */}
    <div className={index.subBody}>
      {loading && <Loader />}
      {!loading && props.children}
    </div>
    <Footer />
  </div>

}
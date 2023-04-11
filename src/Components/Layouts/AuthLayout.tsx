import { SignIn, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";

export default function AuthLayout (props: {children: ReactNode}){
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
      // console.log({token})
    }, [token])
    if (!isLoaded)
      return <></>
    if (!isSignedIn)
      return (
        //Make component for below
        <div className="body">
          <Header />
          <NavBar />
          <div className="subBody">
  
            <div className="box sans">
              <SignIn routing="virtual" afterSignInUrl={router.asPath}/>
            </div>
          </div>
        </div>
      )
    return <div className="body">
        <Header />
        <NavBar />
        {loading && <Loader />}
        <div className="subBody">
           {!loading && props.children}
        </div>
        <Footer/>
    </div>

}
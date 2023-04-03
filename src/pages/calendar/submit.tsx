import Link from "next/link"
import CalendarForm from "../../Components/Calendar/CalendarForm"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import form from "src/styles/Form.module.css"
import Nav from "../../Components/Nav/Nav"
import { SignIn, useAuth, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Unstable_Grid2 as Grid } from "@mui/material"
import { useRouter } from "next/router"

export default function CalendarSubmit() {

  const { isSignedIn, isLoaded } = useUser();

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
        <Nav />
        <div className="subBody">

          <div className="box sans">
            <SignIn routing="virtual" afterSignInUrl={router.asPath}/>
          </div>
        </div>
      </div>
    )
  return (
    <>
      <div className="body">
        <Header />
        <Nav />
        <div className="subBody">
          <div className={form.body}>
            <div className={form.box}>
              <h1>Calendar Submission</h1>
              <h2>All submissions will be included in our weekly newsletter.</h2>
              <p>
                By submitting you agree to our <Link href="/">privacy policy</Link>
              </p>

            </div>

            <CalendarForm profile={false}/>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

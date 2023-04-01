import Link from "next/link"
import DirectoryForm from "../../Components/Directory/DirectoryForm"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import index from "src/styles/Form.module.css"
import Nav from "../../Components/Nav/Nav"
import { SignIn, useUser } from "@clerk/nextjs"
import { useRouter } from "next/router"

export default function DirectorySubmit() {

  const router= useRouter()
  const { isSignedIn } = useUser();
  if (!isSignedIn)
    return (
      <div className="body">
        <Header />
        <Nav />
        <div className="subBody">

          <div className="box">
            <SignIn afterSignInUrl={router.asPath} />
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
          <div className={index.body}>
            <div className={index.box}>
              <h1>Directory Submission</h1>
              <p>By submitting you agree to our <Link href="/">privacy policy</Link></p>
            </div>
            <DirectoryForm profile={false} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

import Link from "next/link"
import ContactForm from "../Components/ContactForm/ContactFormOld"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import index from "src/styles/Form.module.css"
import Nav from "../Components/Nav/Nav"
import DirectoryForm from "../Components/Directory/DirectoryForm"
import { UserContext } from "../Components/UserContext"
import { useContext } from "react"

export default function ContactInfo() {
  const {profile, initialized} = useContext(UserContext)
  if(!initialized)
    return null
  return (
    <>
      <div className="body">

        <Header />
        <Nav />
        <div className="subBody">
          <div className={index.body}>
            <div className={index.box}>
              <h1>Contact Information</h1>
              <p>
                By submitting you agree to our <Link href="/">privacy policy</Link>
              </p>
            </div>
            <DirectoryForm profile={true} data ={profile} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

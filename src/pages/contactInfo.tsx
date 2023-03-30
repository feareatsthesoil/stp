import Link from "next/link"
import ContactForm from "../Components/ContactForm/ContactFormOld"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import index from "src/styles/Form.module.css"
import Nav from "../Components/Nav/Nav"
import DirectoryForm from "../Components/Directory/DirectoryForm"

export default function DirectorySubmit() {
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
            <DirectoryForm profile={true} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

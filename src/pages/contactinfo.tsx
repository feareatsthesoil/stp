import Link from "next/link"
import ContactForm from "../Components/ContactInfo/ContactForm"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import index from "src/styles/Test.module.css"
import Nav from "../Components/Nav/Nav"

export default function DirectorySubmit() {
  return (
    <>
      <div className="body">

          <Header />
          <Nav />
      <div className={index.subBody}>
          <div className={index.box}>
            <h1>Contact Information</h1>
            <p>
              By submitting you agree to our <Link href="/">privacy policy</Link>
            </p>
            <ContactForm />
          </div>
          </div>
          <Footer />

      </div>
    </>
  )
}

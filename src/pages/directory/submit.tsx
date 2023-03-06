import Link from "next/link"
import DirectoryForm from "../../Components/Directory/DirectoryForm"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import index from "src/styles/Form.module.css"
import Nav from "../../Components/VerticalNav/Nav"

export default function DirectorySubmit() {

  return (
    <>
      <div className="body">
        <Header />
        <Nav />
      <div className="subBody">

        <div className={index.box}>
          <h1>Directory Submission</h1>
          <p>By submitting you agree to our <Link href="/">privacy policy</Link></p>
          <DirectoryForm />
        </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

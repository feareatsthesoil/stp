import Link from "next/link"
import DirectoryForm from "../../Components/Directory/DirectoryForm"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import form from "src/styles/Form.module.css"

export default function DirectorySubmit () {

  return (
    <>
      <div className="Body">
        <Header />

        <div className={form.box}>
          <h1>Directory Submission</h1>
          <p>By submitting you agree to our <Link href="/">privacy policy</Link></p>
          <DirectoryForm />
        </div>
        <Footer />
      </div>
    </>
  )
}

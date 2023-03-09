import Link from "next/link"
import CalendarForm from "../../Components/Calendar/CalendarForm"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import form from "src/styles/Form.module.css"
import Nav from "../../Components/Nav/Nav"

export default function CalendarSubmit() {
  return (
    <>
      <div className="body">
        <Header />
        <Nav />
      <div className="subBody">
        <div className={form.box}>
          <h1>Happenings Submission</h1>
          <h2>All submissions will be included in our weekly newsletter.</h2>
          <p>
            By submitting you agree to our <Link href="/">privacy policy</Link>
          </p>
          <CalendarForm />
        </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

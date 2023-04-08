import Link from "next/link"
import CalendarForm from "../../Components/Calendar/CalendarForm"
import form from "src/styles/Form.module.css"
import AuthLayout from "../../Components/Layouts/AuthLayout"

export default function CalendarSubmit() {
  return (
    <AuthLayout>
      <div className={form.body}>
        <div className={form.box}>
          <h1>Calendar Submission</h1>
          <h2>All submissions will be included in our weekly newsletter.</h2>
          <p>
            By submitting you agree to our <Link href="/">privacy policy</Link>
          </p>
        </div>
        <CalendarForm profile={false} />
      </div>
    </AuthLayout>
  )
}

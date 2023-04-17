import Link from "next/link"
import CalendarForm from "../../Components/Calendar/CalendarForm"
import index from "src/styles/Submit.module.css"
import AuthLayout from "../../Components/Layouts/AuthLayout"
import { useContext } from "react"
import { UserContext } from "../../Components/UserContext"
import { Box } from "@mui/system"
import { Alert, AlertTitle } from "@mui/material"

export default function CalendarSubmit() {
  const userData = useContext(UserContext)
  return (
    <AuthLayout>
      <div className={index.body}>
        <div className={index.box}>
          <h1>Calendar Submission</h1>
          <h2>All submissions will be included in our weekly newsletter.</h2>
          <p>
            By submitting you agree to our <Link href="/">privacy policy</Link>.
          </p>
        </div>
        {userData.isMember && <CalendarForm profile={false} />}
        {!userData.isMember && < Box>
          <Alert color="warning">
            <AlertTitle>Must be a member to submit to the calendar</AlertTitle>
            <AlertTitle>
              Sign up <Link href="/membership">here</Link>.
            </AlertTitle>
          </Alert>
        </Box>}
      </div>
    </AuthLayout>
  )
}

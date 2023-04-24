import Link from "next/link"
import CalendarForm from "../../Components/Calendar/CalendarForm"
import css from "src/styles/Submit.module.css"
import AuthLayout from "../../Components/Layouts/AuthLayout"
import { useContext } from "react"
import { UserContext } from "../../Components/UserContext"
import { Box } from "@mui/system"
import { Alert, AlertTitle } from "@mui/material"

export default function CalendarSubmit() {
  const userData = useContext(UserContext)
  return (
    <AuthLayout>
      <div className={css.wrapper}>
        <div className={css.box}>
          <h1>Add to Calendar</h1>
        </div>
        {userData.isMember && <CalendarForm profile={false} />}
        {!userData.isMember && < Box>
          <Alert color="warning">
            <AlertTitle><strong>Members Only</strong></AlertTitle>
            <AlertTitle>
              You must be a member to submit to the calendar.
              Sign up <Link href="/membership">here</Link>.
            </AlertTitle>
          </Alert>
        </Box>}
      </div>
    </AuthLayout>
  )
}

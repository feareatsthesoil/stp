import Link from "next/link"
import DirectoryForm from "../../Components/Directory/DirectoryForm"
import index from "src/styles/Submit.module.css"
import AuthLayout from "../../Components/Layouts/AuthLayout"
import { useContext } from "react"
import { UserContext } from "../../Components/UserContext"
import { Box } from "@mui/system"
import { Alert, AlertTitle } from "@mui/material"

export default function DirectorySubmit() {
  const userData = useContext(UserContext)
  return (
    <AuthLayout>
      <div className={index.body}>
        <div className={index.box}>
          <h1>Directory Submission</h1>
          <p>By submitting you agree to our <Link href="/">privacy policy</Link></p>
        </div>

        {userData.isMember && <DirectoryForm profile={false} />}
        {!userData.isMember && < Box>
          <Alert color="warning">
            <AlertTitle>You must be a member to submit events</AlertTitle>

          </Alert>
          To become a member, you can sign up for our membership here:
          <Link href="/membership">Membership</Link>
        </Box>}

      </div>
    </AuthLayout>
  )
}

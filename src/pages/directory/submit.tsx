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
          <h1>Add to Directory</h1>
        </div>
        {userData.isMember && <DirectoryForm profile={false} />}
        {!userData.isMember && < Box>
          <Alert color="warning">
            <AlertTitle><strong>Members Only</strong></AlertTitle>
            <AlertTitle>
              You must be a member to submit to the directory.
              Sign up <Link href="/membership">here</Link>.
            </AlertTitle>
          </Alert>
        </Box>}

      </div>
    </AuthLayout>
  )
}

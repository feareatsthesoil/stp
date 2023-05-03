import { useContext } from "react"
import Link from "next/link"
import { Alert, AlertTitle } from "@mui/material"
import { Box } from "@mui/system"

import css from "src/styles/Submit.module.css"
import { UserContext } from "../../Components/UserContext"
import AuthLayout from "../../Components/Layouts/AuthLayout"
import DirectoryForm from "../../Components/Directory/DirectoryForm"

export default function DirectorySubmit() {
  const userData = useContext(UserContext)
  return (
    <AuthLayout>
      <div className={css.directoryWrapper}>
        <div className={css.box}>
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

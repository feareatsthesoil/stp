import { useContext } from "react"

import css from "src/styles/Submit.module.css"
import { UserContext } from "../Components/UserContext"
import AuthLayout from "../Components/Layouts/AuthLayout"
import DirectoryForm from "../Components/Directory/DirectoryForm"

export default function info() {
  const { profile, initialized, isMember } = useContext(UserContext)

  if (!initialized) return <></>

  if (!isMember) {
    return <h1>You must be a member to access this page.</h1>;
  }

  return (
    <AuthLayout>
      <div className={css.wrapper}>
        <div className={css.info}>
          {profile ? <h1>Edit your info</h1> : <><h1>Tell us about yourself...</h1> <p>New members have to save to continue</p></>}
        </div>
        <DirectoryForm profile={true} data={profile} />
      </div>
    </AuthLayout>
  )
}

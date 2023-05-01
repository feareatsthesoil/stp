import DirectoryForm from "../Components/Directory/DirectoryForm"
import { UserContext } from "../Components/UserContext"
import { useContext } from "react"
import AuthLayout from "../Components/Layouts/AuthLayout"

import css from "src/styles/Submit.module.css"

export default function info() {
  const { profile, initialized } = useContext(UserContext)

  if (!initialized)
    return <></>
  return (
    <AuthLayout>
      <div className={css.wrapper}>
        <div className={css.box}>
          {profile ? <h1>Edit your info</h1> : <><h1>Tell us about yourself...</h1> <p>New users have to save to continue</p></>}
        </div>
        <DirectoryForm profile={true} data={profile} />
      </div>
    </AuthLayout>
  )
}

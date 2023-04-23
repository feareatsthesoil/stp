import Link from "next/link"
import index from "src/styles/Submit.module.css"
import DirectoryForm from "../Components/Directory/DirectoryForm"
import { UserContext } from "../Components/UserContext"
import { useContext } from "react"
import AuthLayout from "../Components/Layouts/AuthLayout"

export default function info() {
  const { profile } = useContext(UserContext)
  
  return (
    <AuthLayout>
      <div className={index.body}>
        <div className={index.box}>
          <h1>Tell us about yourself...</h1>
        </div>
        <DirectoryForm profile={true} data={profile} />
      </div>
    </AuthLayout>
  )
}

import Link from "next/link"
import index from "src/styles/Form.module.css"
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
          <h1>Contact Information</h1>
          <p>
            By submitting you agree to our <Link href="/">privacy policy</Link>
          </p>
        </div>
        <DirectoryForm profile={true} data={profile} />
      </div>
    </AuthLayout>
  )
}

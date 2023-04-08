import Link from "next/link"
import DirectoryForm from "../../Components/Directory/DirectoryForm"
import index from "src/styles/Form.module.css"
import AuthLayout from "../../Components/Layouts/AuthLayout"

export default function DirectorySubmit() {
  return (
    <AuthLayout>
      <div className={index.body}>
        <div className={index.box}>
          <h1>Directory Submission</h1>
          <p>By submitting you agree to our <Link href="/">privacy policy</Link></p>
        </div>
        <DirectoryForm profile={false} />
      </div>
    </AuthLayout>
  )
}

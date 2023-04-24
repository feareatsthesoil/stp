
import React from "react"
import { SignIn } from "@clerk/nextjs"
import css from "../styles/Login.module.css"
import DefaultLayoutCentered from "../Components/Layouts/DefaultLayoutCentered"
import { useRouter } from "next/router"

const Welcome = () => {
  const router = useRouter();
  const url = router.query.redirect_url as string
  console.log({ query: router.query })

  return (
    <DefaultLayoutCentered>
      <div className={css.box}>
        <SignIn afterSignInUrl={url ?? "/"} />
      </div>
    </DefaultLayoutCentered>
  )
}

export default Welcome
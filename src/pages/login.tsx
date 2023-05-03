import React from "react"
import { SignIn } from "@clerk/nextjs"
import { useRouter } from "next/router"

import css from "../styles/Login.module.css"
import DefaultLayoutCentered from "../Components/Layouts/DefaultLayoutCentered"

const Welcome = () => {
  const router = useRouter();
  const url = router.query.redirect_url as string

  return (
    <DefaultLayoutCentered>
      <div className={css.box}>
        <SignIn afterSignInUrl={url ?? "/"} />
      </div>
    </DefaultLayoutCentered>
  )
}

export default Welcome
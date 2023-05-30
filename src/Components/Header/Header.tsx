import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { UserButton, useUser } from "@clerk/nextjs"

import css from "./Header.module.css"

function Header() {
  const router = useRouter()
  const currentRoute = router.pathname;
  const { isSignedIn } = useUser()

  return (
    <div className={css.wrapper}>
      <Head>
        <meta name="theme-color" content={currentRoute === "/links" ? "#F4F4FE" : "#fff"} />
        <meta name="viewport" content={"width=device-width, initial-scale=1.0,viewport-fit=cover"} />
      </Head>
      <div className={css.logo}>
        <Link href={"/"}>
          <h1>SERVING the PEOPLE</h1>
        </Link>
      </div>
      <div className={css.login}>
        {isSignedIn ? <UserButton /> :
          <Link
            className={currentRoute === "/login" ? css.active : css.idle}
            href={"login"}
          >
            Login
          </Link>
        }</div>
    </div>
  )
}

export default Header
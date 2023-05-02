import React from "react"
import Head from "next/head"
import Link from "next/link"
import header from "./Header.module.css"
import { useRouter } from "next/router"
import { UserButton, useUser } from "@clerk/nextjs"

function Header() {
  const router = useRouter()
  const currentRoute = router.pathname;
  const { isSignedIn } = useUser()

  return (
    <div className={currentRoute === "/" ? header.wrapperHome : header.wrapper}>
      <Head>
        <meta name="theme-color" content={currentRoute === "/" ? "#000" : "#fff"} />
        <meta name="viewport" content={currentRoute === "/" ? "width=device-width, inital-scale=1.0, viewport-fit=cover" : "width=device-width, initial-scale=1.0"} />
      </Head>
      <div className={header.logo}>
        <Link href={"/"}>
          <h1>SERVING the PEOPLE</h1>
        </Link>
      </div>
      <div className={header.login}>
        {isSignedIn ? <UserButton /> :
          <Link
            className={currentRoute === "/login" ? header.active : header.idle}
            href={"login"}
          >
            Login Portal
          </Link>
        }</div>
    </div>
  )
}

export default Header
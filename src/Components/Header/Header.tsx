import React from "react"
import Head from "next/head"
import Link from "next/link"
import header from "./Header.module.css"
import {useRouter} from "next/router"

function Header () {

  const router = useRouter()
  let isHome = false

  if (router.pathname === "/") {
    isHome = true
  }

  return (
    <div className={`${isHome ? header.bodyHome : header.body}`}>
      <Head>
        <meta name="theme-color" content={`${isHome ? "#000" : "#fff"}`} />
      </Head>
      <Link href="/login">Login Portal</Link>
      <Link href="/">
        <h1>SERVING the PEOPLE</h1>
      </Link>
    </div>
  )
}

export default Header

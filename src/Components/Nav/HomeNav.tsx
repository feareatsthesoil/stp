import React from "react"
import Link from "next/link"
import index from "./HomeNav.module.css"
import nav from "../Nav/Nav.json"
import {useUser} from "@clerk/nextjs"


function HomeNav() {
  const isSignedIn = useUser()
  let login = "MobileLogin";
  isSignedIn.isSignedIn ? login="hide" : login="MobileLogin"

    
  return (
    <>
    <div>
      <div className={index.items}>
        <ul>
        <li id={login}>
            <Link href="/login">Login Portal</Link>
          </li>
          {nav.items.map(({ href, name }) => {
              return (
                <li key={name}>
                  <Link
                    href={href}
                    >
                      {name}
                  </Link>
                </li>
              )
          })}
        </ul>
      </div>
    </div>
    </>
  )
}

export default HomeNav

import React from "react"
import Link from "next/link"
import index from "./HomeNav.module.css"
import nav from "../Nav/Nav.json"
import {useUser} from "@clerk/nextjs"


function HomeNav() {
  const user = useUser()
  let login = "MobileLogin";
  const navItems = nav.items.filter(item=>(!item.authorized || user.isSignedIn ))

    
  return (
    <>
    <div>
      <div className={index.items}>
        <ul>
        <li id={user.isSignedIn ? "hide" : "MobileLogin"}>
            <Link href="/login">Login Portal</Link>
          </li>
          {navItems.map(({ href, name }) => {
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

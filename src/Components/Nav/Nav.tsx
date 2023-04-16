import React from "react"
import Link from "next/link"
import index from "./Nav.module.css"
import { useRouter } from "next/router"
import nav from "../Nav/Nav.json"
import {useUser} from "@clerk/nextjs"

const NavBar = () => {
  const user = useUser()
  const router = useRouter();
  const currentRoute = router.pathname;
  const navItems = nav.items.filter(item=>(!item.authorized || user.isSignedIn ))

  return (
    <div className={index.items}>
      <nav>
        <div>
          <ul>
            {navItems.map(({href, name}) => {
              return (
                <li key={name}>
                  <Link
                  href={href}
                  className={currentRoute.startsWith (href) ? index.active : index.a}
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
            <li id={user.isSignedIn ? "hide" : "MobileLogin"}>
              <Link
                href={"/login"}
                className={currentRoute.startsWith("/login") ? index.active : index.a}
              >
                Login Portal
              </Link>
            </li> 
          </ul>
        </div>
      </nav>
    </div>
  )
} 

export default NavBar
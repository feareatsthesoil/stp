import React from "react"
import Link from "next/link"
import css from "./Nav.module.css"
import { useRouter } from "next/router"
import nav from "../Nav/Nav.json"
import { useUser } from "@clerk/nextjs"

const NavBar = () => {
  const user = useUser()
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className={css.items}>
      <nav>
        <div>
          <ul>
            {nav.items.map(({ href, name }) => {
              return (
                <li key={name}>
                  <Link
                    href={href}
                    className={currentRoute.startsWith(href) ? css.active : css.a}
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
            <li id={user.isSignedIn ? "hide" : "MobileLogin"}>
              <Link
                href={"/login"}
                className={currentRoute.startsWith("/login") ? css.active : css.a}
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
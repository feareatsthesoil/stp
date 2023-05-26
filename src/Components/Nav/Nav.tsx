import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

import css from "./Nav.module.css"
import nav from "../Nav/Nav.json"

const NavBar = () => {
  const user = useUser()
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="w-[96vw] border-[0] my-5 p-5 border-t border-b border-solid border-black ">
      <nav>
        <ul className="flex flex-row place-content-center flex-wrap">
          {nav.items.map(({ href, name }) => {
            return (
              <li key={name} className="px-1 text-blue-600 border-[0] border-r-[1px] border-solid border-black underline hover:text-indigo-600">
                <Link
                  href={href}
                  className={currentRoute === href ? "text-indigo-600" : css.a}
                >
                  {name}
                </Link>
              </li>
            )
          })}
          <li id={user.isSignedIn ? "hide" : "MobileLogin"}>
            <Link
              href={"/login"}
              className={`px-1 text-blue-600 border-[0] border-r-[1px] border-solid border-black underline hover:text-indigo-600 ${currentRoute.startsWith("/login") ? "text-indigo-600" : css.a}`}
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
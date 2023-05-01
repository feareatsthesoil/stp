import React, { useState } from "react"
import Link from "next/link"
import css from "./Nav.module.css"
import { useRouter } from "next/router"
import nav from "../Nav/Nav.json"
import { useUser } from "@clerk/nextjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const NavBar = () => {
  const user = useUser()
  const router = useRouter();
  const currentRoute = router.pathname;

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSideNav = () => {
    setMenuOpen(!menuOpen);
  };

  const menuWidth = menuOpen ? '100px' : '0px';

  return (

    <div className={css.items} style={{ width: menuWidth }}>
      <button id={currentRoute === "/" ? css.hide : css.menuBtn} onClick={toggleSideNav}>
        <FontAwesomeIcon icon={faBars} size="2xl" style={{ color: "#000000", }} />
      </button>
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
import React from "react"
import Link from "next/link"
import index from "./Nav.module.css"
import { useRouter } from "next/router";
import nav from "../Nav/Nav.json";

const NavBar = () => {

  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div>
      <nav>
        <div className={index.items}>
          <ul>
            <li>
              <Link
                href={nav.items.about}
                className={currentRoute === nav.items.about ? index.active : index.a}
              >
                {nav.items.aboutName}
              </Link>
            </li>
            <li>
              <Link 
              href={nav.items.calendar}
              className={currentRoute === nav.items.calendar ? index.active : index.a}
              >
                {nav.items.calendarName}
              </Link>
            </li>
            <li>
              <Link 
              href={nav.items.directory}
              className={currentRoute === nav.items.directory ? index.active : index.a}
              >
                {nav.items.directoryName}
              </Link>
            </li>
            <li>
              <Link 
              href={nav.items.membership}
              className={currentRoute === nav.items.membership ? index.active : index.a}
              >
                {nav.items.membershipName}
              </Link>
            </li>
            <li>
              <Link 
              href={nav.items.radio}
              className={currentRoute === nav.items.radio ? index.active : index.a}
              >
                {nav.items.radioName}
              </Link>
            </li>
            <li>
              <Link 
              href={nav.items.discussion}
              className={currentRoute === nav.items.discussion ? index.active : index.a}
              >
                {nav.items.discussionName}
              </Link>
            </li>
            <li>
              <Link 
              href={nav.items.contact}
              className={currentRoute === nav.items.contact ? index.active : index.a}
              >
                {nav.items.contactName}
              </Link>
            </li>
            <li>
              <Link 
              href={nav.items.shop} 
              target="webapp-tab"
              >
                {nav.items.shopName}
                </Link>
            </li>
            <li id="MobileLogin">
              <Link 
              href={nav.items.login}
              className={currentRoute === nav.items.login ? index.active : index.a}
              >
                {nav.items.loginName}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar

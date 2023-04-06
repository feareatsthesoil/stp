import React, { useContext } from "react"
import Link from "next/link"
import index from "./Nav.module.css"
import { useRouter } from "next/router"
import nav from "../Nav/Nav.json"
import {useUser} from "@clerk/nextjs"
import { UserContext } from "../UserContext"

const NavBar = () => {
  const isSignedIn = useUser()
  const router = useRouter();
  const currentRoute = router.pathname;
  
  let isCalendar = false;

  if (currentRoute === "/calendar"){
    isCalendar = true;
  } else if (currentRoute === "/calendar/[eventId]"){
    isCalendar = true;
  } else if (currentRoute === "/calendar/submit"){
    isCalendar = true;
  }else {
    isCalendar = false;
  }

  let isDirectory = false;

  if (currentRoute === "/directory"){
    isDirectory = true;
  } else if (currentRoute === "/directory/submit"){
    isDirectory = true;
  } else {
    isDirectory = false;
  }

  let isLogin = false;
  
  if (currentRoute === "/login"){
    isLogin = true;
  } else if (currentRoute === "/contactInfo"){
    isLogin = true;
  } else {
    isLogin = false;
  }

  let login = "MobileLogin";
  isSignedIn.isSignedIn ? login="hide" : login="MobileLogin"

  const {loggedIn} = useContext(UserContext)
  return (
    <div className={index.items}>
      <nav>
        <div>
          <ul>
            
            {nav.items.map(({href, name}) => {
              
              return (
                <li key={name}>
                  <Link
                  href={href}
                  className={currentRoute.startsWith (href) && (href!=="/") ? index.active : index.a}
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
            {/* <li>
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
              className={isCalendar ? index.active : index.a}
              >
                {nav.items.calendarName}
              </Link>
            </li>
            <li>
              <Link 
              href={nav.items.directory}
              className={isDirectory ? index.active : index.a}
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
            {loggedIn && <li>
              <Link 
              href={"/contactInfo"}
              className={currentRoute === "/contactInfo" ? index.active : index.a}
              >
               Contact Info
                </Link>
            </li>}
            <li id={login}>
              <Link 
              href={nav.items.login}
              className={isLogin ? index.active : index.a}
              >
                {nav.items.loginName}
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
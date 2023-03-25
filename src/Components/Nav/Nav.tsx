import React from "react"
import Link from "next/link"
import index from "./Nav.module.css"
import { useRouter } from "next/router"
import nav from "../Nav/Nav.json"
import {useUser} from "@clerk/nextjs"

const NavBar = () => {
  const isSignedIn = useUser()
  const router = useRouter();
  const currentRoute = router.pathname;
  
  let isCalendar = false;

  if (currentRoute === nav.items.calendar){
    isCalendar = true;
  } else if (currentRoute === nav.items.calendarEvent){
    isCalendar = true;
  } else if (currentRoute === nav.items.calendarSubmit){
    isCalendar = true;
  }else {
    isCalendar = false;
  }

  let isDirectory = false;

  if (currentRoute === nav.items.directory){
    isDirectory = true;
  } else if (currentRoute === nav.items.directorySubmit){
    isDirectory = true;
  } else {
    isDirectory = false;
  }

  let isLogin = false;
  
  if (currentRoute === nav.items.login){
    isLogin = true;
  } else if (currentRoute === nav.items.loginSubmit){
    isLogin = true;
  } else {
    isLogin = false;
  }

  let login = "MobileLogin";
  isSignedIn.isSignedIn ? login="hide" : login="MobileLogin"

  return (
    <div className={index.items}>
      <nav>
        <div>
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
            <li id={login}>
              <Link 
              href={nav.items.login}
              className={isLogin ? index.active : index.a}
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
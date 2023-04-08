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
            <li id={login}>
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
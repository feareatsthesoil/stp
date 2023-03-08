import React from "react"
import Link from "next/link"
import index from "./Nav.module.css"
import { useRouter } from "next/router";

const about = "/about";
const calendar = "/calendar";
const directory = "/directory";
const blog = "/mail";
const mail = "/mail";
const support = "/";
const radio = "/radio";
const discussion = "/discussion";
const contact = "/contact";
const shop = "https://shop.stp.world";
const login = "/login";


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
                href={about}
                className={currentRoute === about ? index.active : index.a}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
              href={calendar}
              className={currentRoute === calendar ? index.active : index.a}
              >
                Calendar
              </Link>
            </li>
            <li>
              <Link 
              href={directory}
              className={currentRoute === directory ? index.active : index.a}
              >
                Directory
              </Link>
            </li>
            <li>
              <Link 
              href={blog}
              className={currentRoute === blog ? index.active : index.a}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
              href={support}
              className={currentRoute === support ? index.active : index.a}
              >
                Support
              </Link>
            </li>
            <li>
              <Link 
              href={radio}
              className={currentRoute === radio ? index.active : index.a}
              >
                Radio
              </Link>
            </li>
            <li>
              <Link 
              href={discussion}
              className={currentRoute === discussion ? index.active : index.a}
              >
                Discussion
              </Link>
            </li>
            <li>
              <Link href={contact}
              className={currentRoute === contact ? index.active : index.a}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link href={shop} target="webapp-tab">Shop</Link>
            </li>
            <li id="MobileLogin">
              <Link 
              href={login}
              className={currentRoute === login ? index.active : index.a}
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

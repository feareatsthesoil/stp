import React from "react"
import Link from "next/link"

import nav from "./Nav.module.css"

const NavBar = () => {

  return (
    <div>
      <nav>
        <div className={nav.items}>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/calendar">Calendar</Link>
            </li>
            <li>
              <Link href="/directory">Directory</Link>
            </li>
            <li>
              <Link href="/mail">Mailing List</Link>
            </li>
            <li>
              <Link href="/">Support</Link>
            </li>
            <li>
              <Link href="/radio">Radio</Link>
            </li>
            <li>
              <Link href="/discussion">Discussion</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
            <Link href="https://shop.stp.world" target="webapp-tab">Shop</Link>
          </li>
            <li id="MobileLogin">
              <Link href="/login">Login Portal</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar

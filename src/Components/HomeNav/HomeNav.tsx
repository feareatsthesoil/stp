import React from "react"
import Link from "next/link"
import nav from "./HomeNav.module.css"

const HomeNav = () => {

  return (
    <div>
      <div className={nav.items}>
        <ul>
          <li id="MobileLogin">
            <Link href="/login">Login Portal</Link>
          </li>
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
            <Link href="/">Memberships</Link>
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
        </ul>
      </div>
    </div>
  )
}

export default HomeNav

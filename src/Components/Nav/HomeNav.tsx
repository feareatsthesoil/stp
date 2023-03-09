import React from "react"
import Link from "next/link"
import index from "./HomeNav.module.css"
import nav from "../Nav/Nav.json";

const HomeNav = () => {

  return (
    <>
    <div>
      <div className={index.items}>
        <ul>
          <li id="MobileLogin">
            <Link href={nav.items.login}>{nav.items.loginName}</Link>
          </li>
          <li>
            <Link href={nav.items.about}>{nav.items.aboutName}</Link>
          </li>
          <li>
            <Link href={nav.items.calendar}>{nav.items.calendarName}</Link>
          </li>
          <li>
            <Link href={nav.items.directory}>{nav.items.directoryName}</Link>
          </li>
          <li>
            <Link href={nav.items.blog}>{nav.items.blogName}</Link>
          </li>
          <li>
            <Link href={nav.items.membership}>{nav.items.membershipName}</Link>
          </li>
          <li>
            <Link href={nav.items.radio}>{nav.items.radioName}</Link>
          </li>
          <li>
            <Link href={nav.items.discussion}>{nav.items.discussionName}</Link>
          </li>
          <li>
            <Link href={nav.items.contact}>{nav.items.contactName}</Link>
          </li>
          <li>
            <Link href={nav.items.shop} target="webapp-tab">{nav.items.shopName}</Link>
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default HomeNav

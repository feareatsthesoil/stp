import React from "react"
import Link from "next/link"
import index from "./HomeNav.module.css"
import nav from "../Nav/Nav.json"
import {useUser} from "@clerk/nextjs"


function HomeNav() {
  const isSignedIn = useUser()
  let login = "MobileLogin";
  isSignedIn.isSignedIn ? login="hide" : login="MobileLogin"

  return (
    <>
    <div>
      <div className={index.items}>
        <ul>
          {nav.items.map(({ href, name }) => {
              return (
                <li key={name}>
                  <Link
                    href={href}
                    >
                      {name}
                  </Link>
                </li>
              )
          })}
          {/* <li id={login}>
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
          </li> */}
        </ul>
      </div>
    </div>
    </>
  )
}

export default HomeNav

import React from "react"
// import Link from "next/link"
// import Nav from "../Nav/Nav"
import footer from "./Footer.module.css"
import FooterSocials from "../FooterSocials"
import { useRouter } from "next/router"

function Footer() {
  const router = useRouter()

  // const className = (
  //   router.pathname === '/calendar'
  //   || router.pathname === '/directory'
  // )
  //   ? footer.stickyBody
  //   : footer.body

  // const footerNav = (
  //   router.pathname === '/' || router.pathname === '/contact'
  // )
  //   ? footer.homeNav
  //   : footer.nav

  const footerLegal = (
    router.pathname === '/'
  )
    ? footer.legalHome
    : footer.legal

  return (
    <>
      <div className={footer.body}>
        {/* <div className={footerNav}><Nav /></div> */}
        {/* <div className={footerLegal}>
          <Link href="/">Legal Disclaimer</Link>&nbsp;
          <hr />
          <div className={footer.break}>
            <p>Copyright © 2017-2023&nbsp;</p>
          </div>
          <div className={footer.break}>
            <em>The STP Creative Inc.</em>
          </div>
        </div> */}
        <div className={footer.socials}>
          <FooterSocials />
        </div>
      </div>
    </>
  )
}

export default Footer

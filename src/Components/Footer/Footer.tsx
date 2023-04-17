import React from "react"
import index from "./Footer.module.css"
import FooterSocials from "../FooterSocials"
import { useRouter } from "next/router"

function Footer() {
  
  const router = useRouter()
  const currentRoute = router.pathname;

  let isHome = false

  if (router.pathname === "/") {
    isHome = true
  }

  return (
    <>
      <div className={currentRoute ==="/" ? index.bodyHome : index.body}>
        <div className={index.socials}>
          <FooterSocials />
        </div>
      </div>
    </>
  )
}

export default Footer
function styled(arg0: string) {
  throw new Error("Function not implemented.")
}


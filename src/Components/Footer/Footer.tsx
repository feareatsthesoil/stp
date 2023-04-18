import React from "react"
import index from "./Footer.module.css"
import Socials from "../Socials"
import { useRouter } from "next/router"

function Footer() {
  const router = useRouter()
  const currentRoute = router.pathname;

  return (
    <>
      <div className={currentRoute === "/" ? index.bodyHome : index.body}>
        <div className={index.socials}>
          <Socials />
        </div>
      </div>
    </>
  )
}

export default Footer
function styled(arg0: string) {
  throw new Error("Function not implemented.")
}


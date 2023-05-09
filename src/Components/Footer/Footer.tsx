import React, { useContext } from "react"
import { useRouter } from "next/router"
import { SignedIn } from "@clerk/nextjs"
import { Button } from "@mui/material"

import css from "./Footer.module.css"
import { UserContext } from "../UserContext"
import Socials from "../Socials"

function Footer() {
  const router = useRouter()
  const currentRoute = router.pathname;
  const userData = useContext(UserContext);

  return (
    <>
      <div className={currentRoute === "/" ? css.wrapperHome : css.wrapper}>
        <div className={css.socials}>
          <Socials />
        </div>
      </div >
    </>
  )
}

export default Footer
function styled(arg0: string) {
  throw new Error("Function not implemented.")
}


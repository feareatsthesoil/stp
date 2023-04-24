import React from "react"
import css from "./Footer.module.css"
import Socials from "../Socials"
import { useRouter } from "next/router"
import Link from "next/link"
import { Button } from "@mui/material"
import { SignedIn } from "@clerk/nextjs"

function Footer() {
  const router = useRouter()
  const currentRoute = router.pathname;

  return (
    <>
      <div className={currentRoute === "/" ? css.bodyHome : css.body}>
        <SignedIn>
          <div className={css.editButton}>
            <Link href="/info">
              <Button variant="contained">
                Edit profile
              </Button>
            </Link>
          </div>
        </SignedIn>
        <div className={css.socials}>
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


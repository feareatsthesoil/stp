import React from "react"
import css from "./Footer.module.css"
import Socials from "../Socials"
import { useRouter } from "next/router"
import Link from "next/link"
import { Button } from "@mui/material"
import { SignedIn } from "@clerk/nextjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const router = useRouter()
  const currentRoute = router.pathname;

  return (
    <>
      <div className={currentRoute === "/" ? css.wrapperHome : css.wrapper}>
        <SignedIn>
          <div className={currentRoute === "/" || currentRoute === "/info" ? css.hide : css.editButton}>
            <Button
              sx={{
                backgroundColor: "rgb(239, 239, 239)",
                opacity: "97%",
                borderRadius: "100%",
                height: "35px",
                width: "35px !important",
                minWidth: "0px !important",
              }}
              href="/info">
              <FontAwesomeIcon icon={faUserPen} style={{ color: "#000", paddingLeft: "4px" }} />
            </Button>
          </div>
        </SignedIn>
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


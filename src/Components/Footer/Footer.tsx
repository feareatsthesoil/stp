import React from "react"
import footer from "./Footer.module.css"
import FooterSocials from "../FooterSocials"

function Footer() {

  return (
    <>
      <div className={footer.body}>
        <div className={footer.socials}>
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


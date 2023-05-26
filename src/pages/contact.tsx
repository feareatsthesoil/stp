import React, { useEffect, useState } from "react"
import Link from "next/link"
import { CSSProperties } from "styled-components"

import css from "../styles/Contact.module.css"
import Address from "../Components/Address/address"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import Nav from "../Components/Nav/Nav"

const contactUs = () => {
  return (
    <>
      <Header />
      <Address />
      <div className={css.body}>
        <Nav />
        <div className={css.box}>
          <h1>Contact Us</h1>
          <p>
            If you would like to contact us, you can write us at the address
            shown above or email <Link href="mailto:info@stp.world">info@stp.world</Link>.
            However, due to the limited number of personnel in our office, we may be unable to provide a timely response.
          </p>
          <p className={css.signature}>Developed by J. Vardy</p>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default contactUs
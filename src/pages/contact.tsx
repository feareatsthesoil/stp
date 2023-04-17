import React from "react"
import Link from "next/link"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import Address from "../Components/Address/address"
import index from "../styles/Contact.module.css"
import Nav from "../Components/Nav/Nav"

const contactUs = () => {
  return (
    <>
    <Header />
<Address />
      <div className={index.body}>
        <Nav />
        <div className={index.subBody}>
          <div className={index.box}>
            <h1>Contact Us</h1>
            <p>
              If you would like to contact us, you can write us at the address
              shown above or email <Link href="mailto:info@stp.world">info@stp.world</Link>.
              However, due to the limited number of personnel in our office, we may be unable to provide a timely response.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default contactUs
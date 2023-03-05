import React from "react"
import Image from 'next/image'
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import index from "../styles/OurCompanies.module.css"
import STPlogo from "../../public/Images/STP-logo.png"
import Woolrichlogo from "../../public/Images/Woolrich-logo.png"
import Studiologo from "../../public/Images/Studio-logo.png"

const OurCompanies = () => {
  return (
    <>
      <div className="body">
        <Header />
        <div className={index.box}>
          <Image
            priority
            placeholder="blur"
            src={STPlogo}
            alt="SERVING the PEOPLE"
            quality={100}
          />
          <Image
            priority
            placeholder="blur"
            src={Woolrichlogo}
            alt="Woolrich by SERVING the PEOPLE"
            quality={100}
          />
          <Image
            priority
            placeholder="blur"
            src={Studiologo}
            alt="SERVING the PEOPLE Studio"
            quality={100}
          />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default OurCompanies

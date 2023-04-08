import React from "react"
import Image from 'next/image'
import index from "../styles/OurCompanies.module.css"
import STPlogo from "../../public/Images/STP-logo.png"
import Woolrichlogo from "../../public/Images/Woolrich-logo.png"
import Studiologo from "../../public/Images/Studio-logo.png"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

const OurCompanies = () => {
  return (
    <DefaultLayout>
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
    </DefaultLayout>
  )
}

export default OurCompanies

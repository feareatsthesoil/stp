import React from "react"
import Image from 'next/image'

import css from "../styles/OurCompanies.module.css"
import DefaultLayoutCentered from "../Components/Layouts/DefaultLayoutCentered"
import STPlogo from "../../public/Images/STP-logo.png"
import Studiologo from "../../public/Images/Studio-logo.png"
import Woolrichlogo from "../../public/Images/Woolrich-logo.png"

const OurCompanies = () => {
  return (
    <DefaultLayoutCentered>
      <div className={css.box}>
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
    </DefaultLayoutCentered>
  )
}

export default OurCompanies

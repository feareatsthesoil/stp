import React from "react"
import Image from 'next/image'

import css from "../styles/Home.module.css"
import Address from "../Components/Address/address"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import homePic from "../../public/Images/home.jpg"
import Nav from "../Components/Nav/Nav"

export default function Home() {
  return (
    <>
      <div className={css.body}>
        <Image
          placeholder="blur"
          className={css.background}
          src={homePic}
          alt="SERVING the PEOPLE"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
        />
        <Header />
        <Address />
        <div className={css.box}>
          <Nav />
        </div>
        <Footer />
      </div>
    </>
  )
}

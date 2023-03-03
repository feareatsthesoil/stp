import React from "react"
import Image from 'next/image'
import Header from "../Components/Header/Header"
import HomeNav from "../Components/HomeNav/HomeNav"
import Address from "../Components/Address/address"
import Footer from "../Components/Footer/Footer"
import Home from "../styles/Home.module.css"
import homePic from "../../public/Images/home.jpg"

export default function Index () {
  return (
    <>
      <div className={Home.body}>
        <Image
          placeholder="empty"
          className={Home.background}
          src={homePic}
          alt="SERVING the PEOPLE"
          fill
          style={{objectFit: "cover"}}
          quality={100}
        />
        <Header />
        <Address />
        <HomeNav />
        <Footer />
      </div>
    </>
  )
}

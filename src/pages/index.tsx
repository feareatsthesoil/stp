import React from "react"
import Image from 'next/image'
import Header from "../Components/Header/Header"
import HomeNav from "../Components/Nav/HomeNav"
import Address from "../Components/Address/address"
import Footer from "../Components/Footer/Footer"
import index from "../styles/Home.module.css"
import homePic from "../../public/Images/home.jpg"

export default function Home() {
  return (
    <>
      <div className={index.body}>
        <Image
          placeholder="blur"
          className={index.background}
          src={homePic}
          alt="SERVING the PEOPLE"
          fill
          style={{ objectFit: "cover" }}
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

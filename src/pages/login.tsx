import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import Link from "next/link"
import index from "../styles/Login.module.css"
import Nav from "../Components/Nav/Nav"
import Index from "../Components/Nav/Nav.json"
import { SignIn } from "@clerk/nextjs"


const Welcome = () => {

  return (
    <>
      <div className={index.body}>
        <Header />
        <Nav />
      <div className="subBody">
          <div className="box sans">
          <SignIn/>
          </div>
          </div>
        <Footer />
      </div>
    </>
  )
}

export default Welcome
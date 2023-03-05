import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import index from "../styles/Contact.module.css"

export default function Custom404() {

  return (
    <>
      <div className="body">
        <Header />
        <div className={index.box}>
          <h1>404 - Page Not Found</h1>
        </div>
        <Footer />
      </div>
    </>
  )
}
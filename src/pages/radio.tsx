import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import index from "../styles/Radio.module.css"

const Radio = () => {
  return (
    <>
      <div className={index.body}>
        <Header />
        <div className={index.box}>
          <h1>NOW PLAYING</h1>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Radio
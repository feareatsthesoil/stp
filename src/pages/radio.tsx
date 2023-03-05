import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import radio from "../styles/Radio.module.css"

const Radio = () => {
  return (
    <>
      <div className={radio.body}>
        <Header />
        <div className={radio.box}>
          <h1>NOW PLAYING</h1>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Radio
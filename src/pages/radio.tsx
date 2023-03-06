import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import index from "../styles/Radio.module.css"
import Nav from "../Components/VerticalNav/Nav"

const Radio = () => {
  return (
    <>
      <div className={index.body}>
        <Header />
        <Nav />
      <div className="subBody">
        <div className={index.box}>
          <h1>NOW PLAYING</h1>
        </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Radio
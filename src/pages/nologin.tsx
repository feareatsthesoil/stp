import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"

const noLogin = () => {
  return (
    <>
      <div className="Body">
        <Header />
        <div className="Box">
          <h1>Login</h1>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default noLogin
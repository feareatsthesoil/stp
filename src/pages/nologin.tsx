import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import Nav from "../Components/VerticalNav/Nav"

const noLogin = () => {
  return (
    <>
      <div className="body">
        
        <Header />
        <Nav />
      <div className="subBody">
          <h1>Login</h1>
          </div>
        <Footer />
      </div>
    </>
  )
}

export default noLogin
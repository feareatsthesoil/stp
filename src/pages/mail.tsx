import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import index from "../styles/Mail.module.css"
import Nav from "../Components/VerticalNav/Nav"

const Mail = () => {

  return (
    <>
      <div className="body">
        <Header />
        <Nav />
      <div className="subBody">
        <div className={index.box}>
          <h1>Add email to mailing list</h1>
          <div className={index.label}>
            <textarea
              id="textarea"
              name="email"
              className={index.textarea}
              placeholder="info@stp.world"
            />
          </div>
          <div className={index.bottomButton}>
            <button id="email">Subscribe</button>
          </div>
          <p>
            You may opt out of emails at any time
          </p>
        </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Mail
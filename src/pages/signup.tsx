import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import Link from "next/link"
import index from "../styles/Login.module.css"
import Nav from "../Components/Nav/Nav"
import Index from "../Components/Nav/Nav.json"
import { SignIn, SignUp } from "@clerk/nextjs"


const Welcome = () => {

  return (
    <>
      <div className={index.body}>
        <Header />
        <Nav />
      <div className="subBody">
          <SignUp/>
          <div className={index.box}>
          

            {/* <h1> Log in</h1>
            <button> Continue with Google</button>
            <button> Continue with Apple</button>
            <button> Connect with Wallet</button>
            <div className={index.input}>
              <p>Email</p>
    
              <textarea
                id="textarea"
                name="email"
                className={index.textarea}
                placeholder="info@stp.world"
              />
            </div>
            <div className={index.emailButton}>
              <button id="email">Continue with email</button>
            </div>
            <Link href={Index.items.loginSubmit}>Forgot Password?</Link> */}
          </div>
          </div>
        <Footer />
      </div>
    </>
  )
}

export default Welcome
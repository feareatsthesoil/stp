import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import Link from "next/link"
import index from "../styles/Login.module.css"

const Welcome = () => {

  return (
    <>
      <div className="Body">
        <Header />
        <div className={index.box}>
          <h1>Log in</h1>
          <button>Continue with Google</button>
          <button>Continue with Apple</button>
          <button>Connect with Wallet</button>
          <div className={index.label}><label htmlFor="textarea"> Email</label><hr/><textarea id="textarea" name="email" className={index.textarea} placeholder="info@stp.world"/></div>
          <div className={index.bottomButton}><button id="email">Continue with email</button></div>
          <Link href="/contactinfo">Forgot Password?</Link>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Welcome
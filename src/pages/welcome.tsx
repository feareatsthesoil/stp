import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import Link from "next/link"

import index from "../styles/Welcome.module.css"

const Welcome = () => {
  return (
    <>
      <div className="Body">
        <Header />
        <div className={index.box}>
          <h1>Welcome!</h1>
          <p>SERVING the PEOPLE is a network of artists and programmers
            leveraging technology to foster meaningful interactions both
            online and in person.
          </p>
          <button>Sign in with Seed</button>

          <Link href="/contactinfo">Sign in with .edu e-mail</Link>

          <p>
            Don&apos;t have a Seed? Seeds can be purchased <Link href="/mintseed">here</Link>
            &nbsp;or on <Link href="https://opensea.io/collection/seeds-luciensmith">OpenSea</Link>.
          </p>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Welcome
import React from "react"
import Link from "next/link"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import index from "../styles/Submit.module.css"
import Nav from "../Components/VerticalNav/Nav"


const Submit = () => {
  return (
    <div className="body">
      <Header />
      <Nav />
      <div className="subBody">
        <div className={index.box}>
          <Link href="/calendar/submit">
            Submit to Calendar
          </Link>
          <Link href="/directory/submit">
            Add to Directory
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Submit
import React from "react"
import Link from "next/link"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import index from "../styles/Submit.module.css"

const Submit = () => {
  return (
    <div className="body">
      <Header />
      <div className={index.box}>
        <Link href="/calendar/submit">
          Submit to Calendar
        </Link>
        <Link href="/directory/submit">
          Add to Directory
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default Submit
import React from "react"
import Link from "next/link"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import submit from "../styles/Submit.module.css"

const Submit = () => {
  return (
    <div className="Body">
      <Header />
      <div className={submit.box}>
        <Link href="/calendar/submit">Submit to Calendar</Link>
        <Link href="/directory/submit">Add to Directory</Link>
      </div>
      <Footer />
    </div>
  )
}

export default Submit
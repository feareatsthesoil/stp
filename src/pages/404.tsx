import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import index from "../styles/Contact.module.css"
import Nav from "../Components/Nav/Nav"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

export default function Custom404() {

  return (
    <DefaultLayout>
          <div className={index.box}>
            <h1>404 - Page Not Found</h1>
          </div>
    </DefaultLayout>
  )
}
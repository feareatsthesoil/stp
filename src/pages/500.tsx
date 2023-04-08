import React from "react"
import index from "../styles/Contact.module.css"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

export default function Custom500() {
  return (
    <DefaultLayout>
      <div className={index.box}>
        <h1>500 - Server-side error occurred</h1>
      </div>
    </DefaultLayout>
  )
}
import React from "react"
import css from "../styles/Contact.module.css"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

export default function Custom500() {
  return (
    <DefaultLayout>
      <div className={css.box}>
        <h1>500 - Server-side error occurred</h1>
      </div>
    </DefaultLayout>
  )
}
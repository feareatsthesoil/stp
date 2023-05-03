import React from "react"

import css from "../styles/Contact.module.css"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

export default function Custom404() {
  return (
    <DefaultLayout>
      <div className={css.box}>
        <h1>404 - Page Not Found</h1>
      </div>
    </DefaultLayout>
  )
}
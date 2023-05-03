import React from "react"
import { SignUp } from "@clerk/nextjs"

import css from "../styles/Login.module.css"
import DefaultLayoutCentered from "../Components/Layouts/DefaultLayoutCentered"

const Welcome = () => {
  return (
    <DefaultLayoutCentered>
      <div className={css.box}>
        <SignUp />
      </div>
    </DefaultLayoutCentered>
  )
}

export default Welcome
import React from "react"
import { SignUp } from "@clerk/nextjs"
import DefaultLayoutCentered from "../Components/Layouts/DefaultLayoutCentered"
import css from "../styles/Login.module.css"

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
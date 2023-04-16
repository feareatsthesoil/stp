import React from "react"
import { SignUp } from "@clerk/nextjs"
import DefaultLayoutCentered from "../Components/Layouts/DefaultLayoutCentered"
import index from "../styles/Login.module.css"

const Welcome = () => {
  return (
    <DefaultLayoutCentered>
      <div className={index.box}>
        <SignUp />
      </div>
    </DefaultLayoutCentered>
  )
}

export default Welcome
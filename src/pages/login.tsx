import React from "react"
import { SignIn } from "@clerk/nextjs"
import index from "../styles/Login.module.css"
import DefaultLayoutCentered from "../Components/Layouts/DefaultLayoutCentered"

const Welcome = () => {
  return (
    <DefaultLayoutCentered>
      <div className={index.box}>
        <SignIn />
      </div>
    </DefaultLayoutCentered>
  )
}

export default Welcome
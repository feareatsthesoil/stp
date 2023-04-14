import React from "react"
import { SignIn } from "@clerk/nextjs"
import DefaultLayout from "../Components/Layouts/DefaultLayout"
import index from "../Components/Layouts/AuthLayout.module.css"

const Welcome = () => {
  return (
    <DefaultLayout>
      <div className={index.box}>
        <SignIn />
      </div>
    </DefaultLayout>
  )
}

export default Welcome
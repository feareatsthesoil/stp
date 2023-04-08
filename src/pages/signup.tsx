import React from "react"
import { SignUp } from "@clerk/nextjs"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

const Welcome = () => {
  return (
    <DefaultLayout>
      <div className="box">
        <SignUp />
      </div>
    </DefaultLayout>
  )
}

export default Welcome
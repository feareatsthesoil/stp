import React from "react"
import { SignIn } from "@clerk/nextjs"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

const Welcome = () => {
  return (
    <DefaultLayout>
      <div className="box sans">
        <SignIn />
      </div>
    </DefaultLayout>
  )
}

export default Welcome
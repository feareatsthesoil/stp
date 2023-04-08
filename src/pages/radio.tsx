import React from "react"
import index from "../styles/Radio.module.css"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

const Radio = () => {
  return (
    <DefaultLayout>
      <div className={index.box}>
        <h1>NOW PLAYING</h1>
      </div>
    </DefaultLayout>
  )
}

export default Radio
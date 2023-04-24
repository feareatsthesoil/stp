import React from "react"
import DefaultLayoutCentered from "../Components/Layouts/DefaultLayoutCentered"
import RadioPlayer from "../Components/RadioPlayer"
import css from "../styles/Radio.module.css"

const Radio = () => {
  return (
    <DefaultLayoutCentered>
      <div className={css.wrapper}>
        <h1>Now Playing</h1>
        <RadioPlayer />
      </div>
    </DefaultLayoutCentered>
  )
}

export default Radio
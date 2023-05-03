import React from "react"

import css from "../styles/Radio.module.css"
import DefaultLayoutCentered from "../Components/Layouts/DefaultLayoutCentered"
import RadioPlayer from "../Components/RadioPlayer"

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
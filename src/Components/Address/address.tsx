import React from "react"

import css from "./Address.module.css"

function Address() {
  return (
    <div className={css.wrapper}>
      <p>83 Canal Street</p>
      <p>New York, NY 10002</p>
      <h2>Official Website</h2>
    </div>
  )
}

export default Address
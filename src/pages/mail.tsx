import React from "react"
import index from "../styles/Mail.module.css"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

const Mail = () => {
  return (
    <DefaultLayout>
      <div className={index.box}>
        <h1>Add email to mailing list</h1>
        <div className={index.label}>
          <textarea
            id="textarea"
            name="email"
            className={index.textarea}
            placeholder="info@stp.world"
          />
        </div>
        <div className={index.bottomButton}>
          <button id="email">Subscribe</button>
        </div>
        <p>
          You may opt out of emails at any time
        </p>
      </div>
    </DefaultLayout>
  )
}

export default Mail
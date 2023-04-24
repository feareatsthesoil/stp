import React from "react"
import css from "../styles/MintSeed.module.css"
import DefaultLayoutCentered from "../Components/Layouts/DefaultLayoutCentered"

const mintSeed = () => {
  return (
    <DefaultLayoutCentered>
      <div className={css.box}>
        <h1>
          Minting a Seed
        </h1>
        <p>
          Currently <strong>1,686</strong> member online
        </p>
        <p>
          <strong>2,055</strong> Seeds on OpenSea
        </p>
      </div>
      <div className={css.inputBox}>
        <label>
          0.1 Eth ~ $100 USD
        </label>
        <input
          name="website"
          className={css.input}
          type="text"
          placeholder="1"
        />
      </div>
      <div className={css.buttonWrapper}>
        <button className={css.button}>
          Connect Wallet
        </button>
      </div>
      <div className={css.bottom}>
        <p>
          Each Seed is 0.1 ethereum (ETH). Due to the fluctuations of ETH
          this amount in more traditional currencies can fluctuate.
        </p>
      </div>
    </DefaultLayoutCentered>
  )
}

export default mintSeed
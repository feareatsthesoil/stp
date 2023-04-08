import React from "react"
import index from "../styles/MintSeed.module.css"
import DefaultLayout from "../Components/Layouts/DefaultLayout"

const mintSeed = () => {
  return (
    <DefaultLayout>
      <div className={index.box}>
        <h1>
          Minting a Seed
        </h1>
        <p>
          Currently <strong>1,686</strong> member online
        </p>
        <p>
          <strong>2,055</strong> Seeds on OpenSea
        </p>
        <div className={index.inputBox}>
          <label>
            0.1 Eth ~ $100 USD
          </label>
          <input
            name="website"
            className={index.input}
            type="text"
            placeholder="1"
          />
        </div>
        <div className={index.buttonBody}>
          <button className={index.button}>
            Connect Wallet
          </button>
        </div>
        <p>
          Each Seed is 0.1 ethereum (ETH). Due to the fluctuations of ETH
          this amount in more traditional currencies can fluctuate.
        </p>
      </div>
    </DefaultLayout>
  )
}

export default mintSeed
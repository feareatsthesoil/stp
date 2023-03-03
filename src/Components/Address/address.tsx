import React from "react"
import {useRouter} from "next/router"

import address from "./Address.module.css"

function Address () {
  const router = useRouter()
  const isHome = router.pathname === "/"

  return (
    <div className={isHome ? address.bodyHome : address.body}>
      <p>83 Canal Street</p>
      <p>New York, NY 10002</p>
      <h2>Official Website</h2>
    </div>
  )
}

export default Address
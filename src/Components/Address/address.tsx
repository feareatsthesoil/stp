import React from "react"
import { useRouter } from "next/router"
import index from "./Address.module.css"

function Address() {
  const router = useRouter()
  const currentRoute = router.pathname;

  return (
    <div className={currentRoute === "/" ? index.bodyHome : index.body}>
      <p>83 Canal Street</p>
      <p>New York, NY 10002</p>
      <h2>Official Website</h2>
    </div>
  )
}

export default Address
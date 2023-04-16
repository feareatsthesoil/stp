import React from "react"
import Link from "next/link"
import DefaultLayoutCentered from "../Components/Layouts/DefaultLayoutCentered"

const Submit = () => {
  return (
    <DefaultLayoutCentered>
      <Link href="/calendar/submit">
        Submit to Calendar
      </Link>
      <Link href="/directory/submit">
        Add to Directory
      </Link>
    </DefaultLayoutCentered>
  )
}

export default Submit
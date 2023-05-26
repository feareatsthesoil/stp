import React, { useContext } from "react"
import Link from "next/link"

function Footer() {
  return (
    <>
      <div className="mt-auto py-[1vh] w-[96vw] flex flex-row">
        <div className="hidden sm:flex sm:flex-col">
          <p>Copyright © 2023, by The STP Creative Foundation.</p>
          <p>All rights reserved. Send comments, suggestions, and/or problems to: info@stp.world</p>
        </div>
        <div
          className="mt-auto ml-auto [&>*]:px-1 [&>*]:text-blue-600 [&>*]:border-[0] [&>*]:border-r-[1px] [&>*]:border-solid [&>*]:border-black [&>*]:underline"
        >
          <Link href="#"
            className="hover:text-indigo-600"
          >
            Instagram
          </Link>
          <Link href="#"
            className="hover:text-indigo-600"
          >
            Twitter
          </Link>
          <Link href="#"
            className="hover:text-indigo-600"
          >
            Opensea
          </Link>
          <Link href="#"
            className="hover:text-indigo-600"
          >
            Discord
          </Link>
        </div>
      </div >
    </>
  )
}

export default Footer
function styled(arg0: string) {
  throw new Error("Function not implemented.")
}


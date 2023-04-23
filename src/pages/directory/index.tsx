import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import Directory from "../../Components/Directory"
import { DirectoryRow } from "../../types"
import index from "../../Components/Directory/Directory.module.css"
import axios from "axios"
import DefaultLayout from "../../Components/Layouts/DefaultLayout"
import { loaded } from "../../redux/slices/directory"
import { useDispatch } from "react-redux"
import { Button } from "@mui/material"
import { UserContext } from "../../Components/UserContext"
import { useConfirm } from "material-ui-confirm"
import { useRouter } from "next/router"

export default function DirectoryPage({ data: fullData }: { data: DirectoryRow[] }) {
  const dispatch = useDispatch()
  const { loggedIn, isMember } = useContext(UserContext)
  const confirm = useConfirm()
  const router = useRouter()

  const handleClick = () => {
    if (!loggedIn) {
      return confirm({ title: "Please log in", description: "Please log in to submit to the directory.", confirmationText: "Log in" }).then(() => {
        router.push("/login?redirect_url=/directory")
      })
    } else if (!isMember) {
      return confirm({ title: "Members only", description: "Please get a membership to submit to the directory.", confirmationText: "Membership" }).then(() => {
        router.push("/membership")
      })
    } else {
      return router.push("/directory/submit")
    }
  }

  useEffect(() => {
    dispatch(loaded(fullData))
  })

  return (
    <DefaultLayout>
      <div className={index.header}>
        <h1>Directory</h1>
        <p>
          All submissions are subject to review. By submitting to the directory you are agreeing to our <Link href="#">Privacy Policy</Link>.
        </p>
        <Button
          className={index.button}
          onClick={handleClick}>
          Submit to Directory
        </Button>
      </div>
      <div className={index.box}>
        <Directory />
      </div>
    </DefaultLayout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.BACKEND_URL}/api/directory`)
  return {
    props: {
      data,
    },
  }
}

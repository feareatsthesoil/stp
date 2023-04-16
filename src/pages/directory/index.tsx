import { useEffect, useState } from "react"
import Link from "next/link"
import Directory from "../../Components/Directory"
import { DirectoryRow } from "../../types"
import index from "../../Components/Directory/Directory.module.css"
import axios from "axios"
import DefaultLayout from "../../Components/Layouts/DefaultLayout"
import { loaded } from "../../redux/slices/directory"
import { useDispatch } from "react-redux"

export default function DirectoryPage({ data: fullData }: { data: DirectoryRow[] }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loaded(fullData))
  })

  return (
    <DefaultLayout>
      <div className={index.header}>
        <h1>Directory</h1>
        <p>
          To <Link href="/directory/submit">submit</Link> to the directory please <Link href="/login">log in</Link>.
          All submissions are subject to review. By submitting to the directory you are agreeing to our <Link href="#">Privacy Policy</Link>.
        </p>
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

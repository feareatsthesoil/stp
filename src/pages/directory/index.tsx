import { useState } from "react"
import Link from "next/link"
import Directory from "../../Components/Directory"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import { DirectoryRow } from "../../types"
import index from "../../Components/Directory/Directory.module.css"
import Nav from "../../Components/Nav/Nav"
import axios from "axios"

export default function DirectoryPage({ data: fullData }: { data: DirectoryRow[] }) {
  const [searchText, setSearchText] = useState("")
  const data = searchText === "" ? fullData : fullData.filter((row) => {
    return row.name.toLowerCase().match(new RegExp(searchText.toLowerCase())) ||
      row.email.toLowerCase().match(new RegExp(searchText.toLowerCase())) ||
      row.category.toLowerCase().match(new RegExp(searchText.toLowerCase())) ||
      row.phone.toLowerCase().match(new RegExp(searchText.toLowerCase()))
  })

  return (
    <>
      <div className={index.body}>
        <Header />
        <Nav />
        <div className="subBody">
          <div className={index.header}>
            <h1>Directory</h1>
            <p>
              To <Link href="/directory/submit">submit</Link> to the directory please <Link href="/login">log in</Link>.
              All submissions are subject to review. By submitting to the directory you are agreeing to our <Link href="#">Privacy Policy</Link>.
            </p>
            <input
              type="text"
              value={searchText}
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <form >
          </form>
          <div className={index.box}>
            <Directory data={data} />
          </div>
        </div>
        <Nav />
        <Footer />
      </div>
    </>
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

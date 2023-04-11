
import index from "./Loader.module.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Image from 'next/image'
import { useRouter } from "next/router"
import homePic from "public/Images/home.jpg"
import Nav from "../../Components/Nav/Nav"

export default function Loader() {
  const router = useRouter()
  let isHome = false

  if (router.pathname === "/") {
    isHome = true
  }

  return (
    <div className={isHome ? index.bodyHome : index.body}>
      <div className={isHome ? index.fullWidth : "subBody"}>
        {/* <div className={isHome ? index.fullWidth : index.dotpulse}> */}
        {/* <div className={`${isHome ? index.loadingHome : index.loaderBody}`}> */}
        <h2 className={isHome ? index.loadingHome : index.loading}>Loading</h2>
        {/* <div className={index.dots}></div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
      {/* <Footer /> */}
    </div>
  )
}
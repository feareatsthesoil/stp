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
      {isHome && (
        <Image
          className={index.background}
          src={homePic}
          alt="SERVING the PEOPLE"
          fill
          style={{ objectFit: "cover" }}
          quality={75}
        />
      )}
      <Header />
      <div className={isHome ? index.show : "subBody"}>
        <div className={isHome ? index.show : index.box}>
          <h1 className={`${isHome ? index.loadingHome : index.loading}`}>
            Loading
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  )
}

import index from "./Loader.module.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Image from 'next/image'
import {useRouter} from "next/router"
import homePic from "public/Images/home.jpg"

export default function Loader () {
  const router = useRouter()
  const isHomepage = router.pathname === "/"
  let isHome = false

  return (
    <div className={isHomepage ? index.bodyHome : index.body}>
      {isHomepage && (
        <Image
          className={index.background}
          src={homePic}
          alt="SERVING the PEOPLE"
          fill
          style={{objectFit: "cover"}}
          quality={75}
        />
      )}
      <Header />
        <h1 className={`${isHome ? index.loadingHome : index.loading}`}>Loading</h1>
      <Footer />
    </div>
  )
}

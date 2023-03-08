import index from "./Loader.module.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Image from 'next/image'
import { useRouter } from "next/router"
import homePic from "public/Images/home.jpg"
import Nav from "../../Components/VerticalNav/Nav"

export default function Loader() {
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
          style={{ objectFit: "cover" }}
          quality={75}
        />
      )}
      <Header />

      <div className={isHomepage ? index.hideNav : index.showNav}>
        <Nav />
      </div>
      <div className={isHomepage ? index.show : "subBody"}>
        <div className={index.box}>
          <h1 className={`${isHome ? index.loadingHome : index.loading}`}>
            Loading
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  )
}

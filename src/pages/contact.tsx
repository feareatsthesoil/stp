import React, { useEffect, useState } from "react"
import Link from "next/link"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import Address from "../Components/Address/address"
import css from "../styles/Contact.module.css"
import Nav from "../Components/Nav/Nav"
import { useSideNav } from "../Components/Nav/NavContext"

const contactUs = () => {
  const { sideNavVisible } = useSideNav();
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const subBodyStyle = {
    overflow: "hidden",
    width:
      sideNavVisible
        ? "calc(100vw - 130px)"
        : windowWidth && windowWidth <= 450
          ? "100vw"
          : "calc(100vw - 130px)",
  };

  const boxStyle = {
    width:
      sideNavVisible
        ? "calc(100vw - 150px)"
        : windowWidth && windowWidth <= 450
          ? "95vw"
          : "",
  }

  return (
    <>
      <Header />
      <Address />
      <div className={css.body}>
        <Nav />
        <div className={css.subBody} style={subBodyStyle}>
          <div className={css.box} style={boxStyle}>
            <h1>Contact Us</h1>
            <p>
              If you would like to contact us, you can write us at the address
              shown above or email <Link href="mailto:info@stp.world">info@stp.world</Link>.
              However, due to the limited number of personnel in our office, we may be unable to provide a timely response.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default contactUs
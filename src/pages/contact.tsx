import React, { useEffect, useState } from "react"
import Link from "next/link"
import { CSSProperties } from "styled-components"

import css from "../styles/Contact.module.css"
import { useSideNav } from "../Components/Nav/NavContext"
import Address from "../Components/Address/address"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import Nav from "../Components/Nav/Nav"

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

  const subBodyStyle: CSSProperties = {
    overflowX: "hidden",
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
            <p className={css.signature}>Developed by J. Vardy</p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default contactUs
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@mui/material"
import { useRouter } from "next/router"
import { useUser } from "@clerk/nextjs"

import css from "./Nav.module.css"
import { useSideNav } from "./NavContext"
import nav from "../Nav/Nav.json"

const NavBar = () => {
  const user = useUser()
  const router = useRouter();
  const currentRoute = router.pathname;

  const { sideNavVisible, setSideNavVisible } = useSideNav();
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const subBody = document.getElementById("subBody");
      if (subBody) {
        subBody.style.marginLeft = sideNavVisible ? "250px" : "0";
      }
    }
  }, [sideNavVisible]);

  const toggleNav = () => {
    if (isMobile) {
      setSideNavVisible((prevState) => !prevState);
    }
  };

  const isHome = currentRoute === "/";
  const isMobile = windowWidth !== undefined && windowWidth <= 450;

  return (
    <div className={css.items}>
      {!isHome && isMobile && (
        <Button
          sx={{
            backgroundColor: "white",
            opacity: "97%",
            borderRadius: "80%",
            height: "40px!important",
            width: "40px !important",
            minWidth: "0px !important",
          }}
          id={css.menuBtn} onClick={() => toggleNav()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="6.75" width="14" height="1.5" rx="0.5" fill="#111" />
            <rect x="5" y="11.25" width="14" height="1.5" rx="0.5" fill="#111" />
            <rect x="5" y="15.75" width="9" height="1.5" rx="0.5" fill="#111" />
          </svg>
        </Button>
      )}
      <nav>
        <div>
          <ul style={{ display: !isHome && isMobile ? (sideNavVisible ? "block" : "none") : "block" }}>
            {nav.items.map(({ href, name }) => {
              return (
                <li key={name}>
                  <Link
                    href={href}
                    className={currentRoute.startsWith(href) ? css.active : css.a}
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
            <li id={user.isSignedIn ? "hide" : "MobileLogin"}>
              <Link
                href={"/login"}
                className={currentRoute.startsWith("/login") ? css.active : css.a}
              >
                Login Portal
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
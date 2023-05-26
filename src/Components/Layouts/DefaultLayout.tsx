import { ReactNode, useContext, useEffect, useState } from "react";
import { CSSProperties } from "styled-components";
import clsx from "clsx";

import css from "./DefaultLayout.module.css";
import { UserContext } from "../UserContext";
import { useSideNav } from "../Nav/NavContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";
import usePageLoader from "../../hooks/usePageLoader";

export default function DefaultLayout(props: {
  children: ReactNode;
  boxClassName?: string;
}) {
  const { initialized } = useContext(UserContext);
  const loading = usePageLoader() || !initialized;

  return (
    <div className={css.body}>
      <Header />
      <NavBar />
      <div className={css.box}>
        {loading && <Loader />}
        {!loading && props.children}
      </div>
      <Footer />
    </div>
  );
}

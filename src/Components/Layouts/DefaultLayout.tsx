import { ReactNode, useContext } from "react";
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

interface DefaultLayoutProps {
  children: ReactNode;
  boxClassName?: string;
  backgroundColor?: string;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { initialized } = useContext(UserContext);
  const loading = usePageLoader() || !initialized;

  const layoutStyles: CSSProperties = {
    backgroundColor: props.backgroundColor,
  };

  return (
    <div className={css.body}>
      <Header />
      <NavBar />
      <div className={clsx(css.box, props.boxClassName)} style={layoutStyles}>
        {loading && <Loader />}
        {!loading && props.children}
      </div>
      <Footer />
    </div>
  );
}

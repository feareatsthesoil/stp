import clsx from "clsx";
import { ReactNode, useContext } from "react";
import { CSSProperties } from "styled-components";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavBar from "../Nav/Nav";
import { UserContext } from "../UserContext";
import css from "./DefaultLayout.module.css";

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
        {!loading && props.children}
      </div>
      <Footer />
    </div>
  );
}

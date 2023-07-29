import { ReactNode, useContext } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import { UserContext } from "../UserContext";
import Head from "next/head";

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { initialized } = useContext(UserContext);
  const loading = usePageLoader() || !initialized;

  return (
    <div className="mx-4 flex min-h-[100svh] flex-col items-center">
      <Head>
        <meta name="theme-color" content="#fff" />
      </Head>
      <Nav />
      <div className="mx-0">{!loading && props.children}</div>
      <Footer />
    </div>
  );
}

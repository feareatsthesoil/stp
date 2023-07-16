import { ReactNode, useContext } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavBar from "../Nav/Nav";
import { UserContext } from "../UserContext";

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
  const { initialized } = useContext(UserContext);
  const loading = usePageLoader() || !initialized;

  return (
    <div className="flex min-h-[100svh] flex-col items-center">
      <Header />
      <NavBar />
      <div className="mx-[4vw]">{!loading && props.children}</div>
      <Footer />
    </div>
  );
}

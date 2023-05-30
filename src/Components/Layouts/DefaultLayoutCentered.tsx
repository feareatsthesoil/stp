import { ReactNode, useContext } from "react";
import { useRouter } from "next/router";

import css from "./DefaultLayoutCentered.module.css"
import { UserContext } from "../UserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";
import usePageLoader from "../../hooks/usePageLoader";

export default function DefaultLayout(props: { children: ReactNode }) {
    const { initialized } = useContext(UserContext);
    const loading = usePageLoader() || !initialized
    const router = useRouter()

    return <div className={css.body}>
        <Header />
        <NavBar />
        {loading && <Loader />}
        <div className={css.box}>
            {!loading && props.children}
        </div>
        <Footer />
    </div>

}
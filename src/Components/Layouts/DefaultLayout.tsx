
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";
import RadioPlayerMini from "../RadioPlayer/RadioPlayerMini";
import { UserContext } from "../UserContext";
import css from "./DefaultLayout.module.css"
import DefaultLayoutCentered from "./DefaultLayoutCentered";

export default function DefaultLayout(props: { children: ReactNode }) {
    const { initialized, profile, loggedIn } = useContext(UserContext);
    const loading = usePageLoader() || !initialized
    const router = useRouter()
    if (initialized && loggedIn && !profile) {
        if (router.asPath == "/info") {
        }
        router.push("/info")
        return <DefaultLayoutCentered> Redirecting...</DefaultLayoutCentered>
    }
    return <div className={css.body}>
        <Header />
        <NavBar />
        <div className={css.subBody}>
            <div className={css.box}>
                {loading && <Loader />}
                {!loading && props.children}
            </div>
        </div>
        <RadioPlayerMini />
        <Footer />
    </div>

}
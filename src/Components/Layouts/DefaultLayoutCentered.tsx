import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";
import { UserContext } from "../UserContext";
import index from "./DefaultLayoutCentered.module.css"

export default function DefaultLayout(props: { children: ReactNode }) {
    const { initialized, profile, loggedIn } = useContext(UserContext);
    const loading = usePageLoader() || !initialized
    const router = useRouter()
    if (initialized && loggedIn && !profile) {
        if (router.asPath == "/info") {
        }
        router.push("/info")
        return <div className={index.body}>
            <Header />
            <NavBar />
            <div className={index.subBody}>
                <div className={index.box}>
                    Redirecting...
                </div>
            </div>
            <Footer />
        </div>
    }
    return <div className={index.body}>
        <Header />
        <NavBar />
        <div className={index.subBody}>
            <div className={index.box}>
                {loading && <Loader />}
                {!loading && props.children}
            </div>
        </div>
        <Footer />
    </div>

}
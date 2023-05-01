import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";
import { useSideNav } from "../Nav/NavContext";
import { UserContext } from "../UserContext";
import css from "./DefaultLayoutCentered.module.css"

export default function DefaultLayout(props: { children: ReactNode }) {
    const { initialized, profile, loggedIn } = useContext(UserContext);
    const loading = usePageLoader() || !initialized
    const router = useRouter()

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

    const subBodyStyle = {
        overflow: "hidden",
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
                    ? "100vw"
                    : "",
    }

    if (initialized && loggedIn && !profile) {
        if (router.asPath == "/info") {
        }
        router.push("/info")
        return <div className={css.body}>
            <Header />
            <NavBar />
            <div className={css.subBody}>
                <div className={css.box}>
                    Redirecting...
                </div>
            </div>
            <Footer />
        </div>
    }
    return <div className={css.body}>
        <Header />
        <NavBar />
        <div className={css.subBody} style={subBodyStyle}>
            {loading && <Loader />}
            <div className={css.box} style={boxStyle}>
                {!loading && props.children}
            </div>
        </div>
        <Footer />
    </div>

}
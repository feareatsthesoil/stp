import { CSSProperties, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import css from "./DefaultLayoutCentered.module.css"
import { UserContext } from "../UserContext";
import { useSideNav } from "../Nav/NavContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";
import usePageLoader from "../../hooks/usePageLoader";

export default function DefaultLayout(props: { children: ReactNode }) {
    const { initialized, profile, loggedIn, isMember } = useContext(UserContext);
    const loading = usePageLoader() || !initialized
    const router = useRouter()

    const { sideNavVisible, setSideNavVisible } = useSideNav();
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

    useEffect(() => {
        if (windowWidth && windowWidth > 575 && sideNavVisible) {
            setSideNavVisible(false);
        }
    }, [windowWidth]);

    const subBodyStyle: CSSProperties = {
        overflowX: "hidden",
        width:
            sideNavVisible
                ? "calc(100vw - 130px)"
                : windowWidth && windowWidth <= 750
                    ? "100vw"
                    : "calc(100vw - 130px)",
    };

    const boxStyle = {
        width:
            sideNavVisible
                ? "calc(100vw - 150px)"
                : windowWidth && windowWidth <= 750
                    ? "100vw"
                    : "",
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
import { ReactNode } from "react";
import usePageLoader from "../../hooks/usePageLoader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader";
import NavBar from "../Nav/Nav";

export default function DefaultLayout (props: {children: ReactNode}){
    const loading  = usePageLoader()
    return <div className="body">
        <Header />
        <NavBar />
        
        <div className="subBody">
        {loading && <Loader />}
            {props.children}
        </div>
        <Footer/>
    </div>

}